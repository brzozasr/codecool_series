# from dotenv import load_dotenv

import bcrypt
from flask import Flask, render_template, request, session, jsonify, redirect

from data.database_handler import *
from data.query import *
from data.query_py import *
from utils import *

# load_dotenv()
app = Flask(__name__)
app.jinja_env.globals.update(set_rating_stars=set_rating_stars)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.secret_key = SESSION_SECRET_KEY


@app.context_processor
def inject_variable():
    return dict(
        COL_TITLE=COL_TITLE,
        COL_YEAR=COL_YEAR,
        COL_RUNTIME=COL_RUNTIME,
        COL_RATING=COL_RATING,
        ORD_ASC=ORD_ASC,
        ORD_DESC=ORD_DESC,
        SHOWS_LIMIT=SHOWS_LIMIT,
        HP_LIMIT=HP_LIMIT,
        ACT_COL_NAME=ACT_COL_NAME,
        ACT_COL_BIRTHDAY=ACT_COL_BIRTHDAY,
        ACT_COL_DEATH=ACT_COL_DEATH,
        ACT_LIMIT=ACT_LIMIT,
        GS_COL_TITLE=GS_COL_TITLE,
        GS_COL_YEAR=GS_COL_YEAR,
        GS_COL_RUNTIME=GS_COL_RUNTIME,
        GS_COL_RATING=GS_COL_RATING,
        GS_LIMIT=GS_LIMIT,
        SESSION_USER_ID=SESSION_USER_ID,
        SESSION_USER_LOGIN=SESSION_USER_LOGIN
    )


@app.route('/')
@app.route('/<string:order>/<int:page_no>/', endpoint="hp_with_params")
def index(page_no=1, order=ORD_DESC):
    records = db.execute_sql(query.shows_count_records)
    count_records = records[0][0]

    dict_webpages = pagination_len(count_records, page_no, HP_LIMIT, visible_pagination=5)
    all_pages = pages_number(count_records, HP_LIMIT)
    offset = dict_webpages.get(page_no)

    shows = db.execute_sql_dict(get_title_shows_sql(order, offset))

    sql = {
        'order': order,
        'page_no': page_no,
        'pages': all_pages
    }

    return render_template('index.html', shows=shows, sql=sql, dict_webpages=dict_webpages)


@app.route('/shows/', endpoint='shows')
@app.route('/shows/most-rated/', endpoint='most-rated')
@app.route('/shows/<string:column>/<string:order>/<int:page_no>/', endpoint='shows-pagination')
def get_shows(column=COL_RATING, order=ORD_DESC, page_no=1):
    error = None
    shows_dict = list()
    sql = dict()
    dict_webpages = dict()

    records = db.execute_sql(query.shows_count_records)
    count_records = records[0][0]
    if not is_positive_int(count_records):
        error = f"""There is a problem with returned records:\n<br>{records}."""
        return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)

    dict_webpages = pagination_len(count_records, page_no, SHOWS_LIMIT, visible_pagination=5)
    # dict_webpages = pages_dict(count_records, SHOWS_LIMIT)  # all pages
    offset = dict_webpages.get(page_no)
    if not is_positive_int(offset):
        offset = 0
    # current_page_no = current_page(count_records, SHOWS_LIMIT, offset)
    all_pages = pages_number(count_records, SHOWS_LIMIT)

    if sql_query := get_shows_sql(column, order, offset):
        shows_dict = db.execute_sql_dict(sql_query)
        if type(shows_dict) != list:
            error = f"""There is a problem with returned data:\n<br>{shows_dict}."""
            shows_dict = list()
            return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql,
                                   dict_webpages=dict_webpages)
    else:
        error = f'There is wrong data sent by route.'
        return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)

    sql = {
        'column': column,
        'order': order,
        'page_no': page_no,
        'pages': all_pages
    }

    return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)


@app.route('/show/<int:show_id>/')
def show_detail(show_id):
    error = None
    db_data = dict()
    seasons = list()

    result = db.execute_sql_dict(query.show_details, [show_id])
    if type(result) != list:
        error = f"""There is a problem with returned data:\n<br>{result}."""
        return render_template('show_detail.html', error=error, db_data=db_data, seasons=seasons)

    seasons = db.execute_sql_dict(query.seasons_by_id_show, [show_id])
    if type(seasons) != list:
        error = f"""There is a problem with returned data:\n<br>{seasons}."""
        return render_template('show_detail.html', error=error, db_data=db_data, seasons=seasons)

    genres_dict = get_dict(replace_quote(result[0].get('genres_name')), 'genre_name', sort_dict=True)
    actors_dict = get_dict(replace_quote(result[0].get('actors_name')), 'actor_name', sort_dict=True)
    characters_dict = get_dict(replace_quote(result[0].get('characters_name')))

    db_data = {
        'show_id': show_id,
        'show_title': result[0].get('title'),
        'show_year': date_formater(result[0].get('year')),
        'show_round_rating': result[0].get('round_rating'),
        'show_rating': result[0].get('rating'),
        'show_runtime': min_to_h_min(result[0].get('runtime')),
        'show_overview': result[0].get('overview'),
        'show_trailer': result[0].get('trailer'),
        'show_trailer_id': get_trailer_id(result[0].get('trailer')),
        'show_homepage': result[0].get('homepage'),
        'show_genres': genres_to_str(genres_dict, only_genres=False),
        'show_actors': actors_to_string(actors_dict, characters_dict, return_no_actors='ALL', html_actors=True),
    }

    return render_template('show_detail.html', error=error, db_data=db_data, seasons=seasons)


@app.route('/episodes/<int:season_id>/')
def episodes(season_id):
    error = None
    episodes_list = list()
    season_data = list()

    result = db.execute_sql_dict(query.episodes_select_by_season_id, [season_id])
    if type(result) != list:
        error = f"""There is a problem with returned data:\n<br>{result}."""
        return render_template('episodes.html', error=error, episodes_list=episodes_list, season_data=season_data)

    season_data = db.execute_sql_dict(query.season_by_id, [season_id])
    if type(season_data) != list:
        error = f"""There is a problem with returned data:\n<br>{season_data}."""
        return render_template('episodes.html', error=error, episodes_list=episodes_list, season_data=season_data)

    episodes_list = result

    return render_template('episodes.html', error=error, episodes_list=episodes_list, season_data=season_data)


@app.route('/actors/')
@app.route('/actors/<string:column>/<string:order>/<int:page_no>/', endpoint='actors-pagination')
def actors(column=ACT_COL_NAME, order=ORD_ASC, page_no=1):
    error = None
    actors_dict = list()
    sql = dict()
    dict_webpages = dict()

    records = db.execute_sql(query.actors_count_records)
    count_records = records[0][0]
    if not is_positive_int(count_records):
        error = f"""There is a problem with returned records:\n<br>{records}."""
        return render_template('actors.html', actors_dict=actors_dict, error=error, sql=sql,
                               dict_webpages=dict_webpages)

    dict_webpages = pagination_len(count_records, page_no, ACT_LIMIT, visible_pagination=11)
    offset = dict_webpages.get(page_no)
    if not is_positive_int(offset):
        offset = 0

    all_pages = pages_number(count_records, ACT_LIMIT)

    if sql_query := get_all_actors_sql(column, order, offset):
        actors_dict = db.execute_sql_dict(sql_query)
        if type(actors_dict) != list:
            error = f"""There is a problem with returned data:\n<br>{actors_dict}."""
            actors_dict = list()
            return render_template('actors.html', actors_dict=actors_dict, error=error, sql=sql,
                                   dict_webpages=dict_webpages)
    else:
        error = f'There is wrong data sent by route.'
        return render_template('actors.html', actors_dict=actors_dict, error=error, sql=sql,
                               dict_webpages=dict_webpages)

    sql = {
        'column': column,
        'order': order,
        'page_no': page_no,
        'pages': all_pages
    }

    return render_template('actors.html', actors_dict=actors_dict, error=error, sql=sql, dict_webpages=dict_webpages)


@app.route('/actor/<int:actor_id>/')
def actor(actor_id):
    actor_dict = db.execute_sql_dict(query.actor_get_by_id, [actor_id])

    actor_filmography = db.execute_sql_dict(query.actor_filmography, [actor_id])
    if type(actor_filmography) == list and len(actor_filmography) > 0:
        shows_str = ''
        for show in actor_filmography:
            shows_str += f"""<a href="/show/{show.get('sh_id')}/">{show.get('sh_title')}</a>, """
        shows_str = shows_str[:-2]
    else:
        shows_str = ''

    name = actor_dict[0].get('name')
    birthday = date_formater(actor_dict[0].get('birthday'))
    death = date_formater(actor_dict[0].get('death'))
    biography = actor_dict[0].get('biography')

    actor_details = {
        'actor_id': actor_id,
        'name': name,
        'birthday': birthday,
        'death': death,
        'biography': biography,
        'filmography': shows_str
    }

    return render_template('actor.html', actor_details=actor_details)


@app.route('/genres/')
def genres():
    genres_dict = db.execute_sql_dict(query.genres_select_all)
    if type(genres_dict) != list:
        error = f"""There is a problem with returned data:\n<br>{genres_dict}."""
        genres_dict = list()
        return render_template('genres.html', error=error, genres_dict=genres_dict)

    return render_template('genres.html', genres_dict=genres_dict)


@app.route('/genre-shows/<int:genre_id>/', endpoint='genre-shows-id')
@app.route('/genre-shows/<string:column>/<string:order>/<int:page_no>/<int:genre_id>/', endpoint='genre-shows-paging')
def genre_shows(genre_id, column=GS_COL_RATING, order=ORD_DESC, page_no=1):
    error = None
    shows_dict = list()
    sql = dict()
    dict_webpages = dict()

    records = db.execute_sql(query.count_genre_shows, [genre_id])
    count_records = records[0][0]
    if not is_positive_int(count_records):
        error = f"""There is a problem with returned records:\n<br>{records}."""
        return render_template('genre_shows.html', shows_dict=shows_dict, error=error, sql=sql,
                               dict_webpages=dict_webpages)

    dict_webpages = pagination_len(count_records, page_no, GS_LIMIT, visible_pagination=5)
    offset = dict_webpages.get(page_no)
    if not is_positive_int(offset):
        offset = 0
    all_pages = pages_number(count_records, GS_LIMIT)

    if sql_query := get_genre_shows_sql(genre_id, column, order, offset):
        shows_dict = db.execute_sql_dict(sql_query)
        if type(shows_dict) != list:
            error = f"""There is a problem with returned data:\n<br>{shows_dict}."""
            shows_dict = list()
            return render_template('genre_shows.html', shows_dict=shows_dict, error=error, sql=sql,
                                   dict_webpages=dict_webpages)
    else:
        error = f'There is wrong data sent by route.'
        return render_template('genre_shows.html', shows_dict=shows_dict, error=error, sql=sql,
                               dict_webpages=dict_webpages)

    sql = {
        'column': column,
        'order': order,
        'page_no': page_no,
        'pages': all_pages,
        'genre_id': genre_id
    }

    return render_template('genre_shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)


@app.route('/user-login', methods=['POST'])
def user_login():
    data = request.get_json()
    users_login = data['users_login']
    users_pass = data['users_pass']

    log_data = db.execute_sql(query.users_select_by_users_login, [users_login])

    if log_data and type(log_data) == list and len(log_data) == 1:
        user_data = {}
        dict_key = [SESSION_USER_ID, SESSION_USER_LOGIN, 'users_pass']
        i = 0
        for data in log_data[0]:
            user_data[dict_key[i]] = data
            i += 1
        if users_login == user_data[SESSION_USER_LOGIN] and \
                bcrypt.checkpw(users_pass.encode('utf-8'), user_data['users_pass'].encode('utf-8')):
            session[SESSION_USER_ID] = user_data[SESSION_USER_ID]
            session[SESSION_USER_LOGIN] = user_data[SESSION_USER_LOGIN]
            result = jsonify({
                'users_id': user_data[SESSION_USER_ID],
                'users_login': user_data[SESSION_USER_LOGIN],
                'login': 'Success',
                'error': None
            })
        else:
            result = jsonify({
                'users_id': None,
                'users_login': None,
                'login': 'Failure',
                'error': 'Invalid email address or password!'
            })
    else:
        if type(log_data) == list:
            result = jsonify({
                'users_id': None,
                'users_login': None,
                'login': 'Failure',
                'error': 'Invalid email address or password!'
            })
        else:
            result = jsonify({
                'users_id': None,
                'users_login': None,
                'login': 'Failure',
                'error': str(log_data)
            })

    return result


@app.route('/is-user-login', methods=['POST'])
def is_user_login():
    data = request.get_json()

    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        if int(data['users_id']) == session.get(SESSION_USER_ID) and \
                data['users_login'] == session.get(SESSION_USER_LOGIN):
            result = jsonify({
                'is_login': True
            })
        else:
            result = jsonify({
                'is_login': False
            })
    else:
        result = jsonify({
            'is_login': False
        })

    return result


@app.route('/user-register', methods=['POST'])
def user_register():
    data = request.get_json()
    users_login = data['users_login']
    users_pass = data['users_pass']

    pass_hash = bcrypt.hashpw(users_pass.encode('utf-8'), bcrypt.gensalt())
    error = db.execute_sql(query.users_insert_new_user, [users_login, pass_hash.decode('utf-8')], fetch=False)

    if error:
        result = jsonify({
            'register': 'Failure',
            'error': str(error)
        })
    else:
        result = jsonify({
            'register': 'Success',
            'error': None
        })

    return result


@app.route('/user-logout', methods=['POST'])
def user_logout():
    data = request.get_json()
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN) and data['command'] == 'LOGOUT':
        session.pop(SESSION_USER_ID, None)
        session.pop(SESSION_USER_LOGIN, None)
        session.clear()

        result = jsonify({
            'logout': 'Success'
        })
    else:
        result = jsonify({
            'logout': 'Failure'
        })

    return result


@app.route('/user-not-login/')
def not_login():
    return render_template('not_login.html')


@app.route('/add/')
def add():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        return render_template('add.html')
    else:
        return redirect('/user-not-login/')


@app.route('/check-show-title/', methods=['POST'])
def check_show_title():
    data = request.get_json()
    title = data['title']

    result = db.execute_sql_dict(query.check_show_title, [title])

    if type(result) == list:
        if len(result) == 0:
            result_dict = {"is_title_in_db": 'NO'}
        else:
            result_dict = {"is_title_in_db": 'YES'}
    else:
        result_dict = {"is_title_in_db": 'ERROR'}

    return jsonify(result_dict)


@app.route('/check-actor-name/', methods=['POST'])
def check_actor_name():
    data = request.get_json()
    name = data['name']

    result = db.execute_sql_dict(query.check_actor_name, [name])

    if type(result) == list:
        if len(result) == 0:
            result_dict = {"is_name_in_db": 'NO'}
        else:
            result_dict = {"is_name_in_db": 'YES'}
    else:
        result_dict = {"is_name_in_db": 'ERROR'}

    return jsonify(result_dict)


@app.route('/check-genre-name/', methods=['POST'])
def check_genre_name():
    data = request.get_json()
    name = data['name']

    result = db.execute_sql_dict(query.check_genre_name, [name])

    if type(result) == list:
        if len(result) == 0:
            result_dict = {"is_genre_in_db": 'NO'}
        else:
            result_dict = {"is_genre_in_db": 'YES'}
    else:
        result_dict = {"is_genre_in_db": 'ERROR'}

    return jsonify(result_dict)


@app.route('/get-show-title/', methods=['POST'])
def get_show_title():
    data = request.get_json()
    phrase = data['phrase']
    search_phrase = f'{phrase}%'

    result = db.execute_sql_dict(query.search_show_title, [search_phrase])

    return jsonify(result)


@app.route('/get-genres-name/', methods=['POST'])
def get_genres_name():
    result = db.execute_sql_dict(query.genres_select_all)

    return jsonify(result)


@app.route('/get-actors-name/', methods=['POST'])
def get_actors_name():
    data = request.get_json()
    phrase = data['phrase']
    search_phrase = f'{phrase}%'

    result = db.execute_sql_dict(query.search_actor_name, [search_phrase])

    return jsonify(result)


@app.route('/get-seasons-title/by/show_id/', methods=['POST'])
def get_seasons_title():
    data = request.get_json()
    show_id = data['show_id']

    result = db.execute_sql_dict(query.seasons_select_seasons_title_by_show_id, [show_id])
    print(result)

    return jsonify(result)


@app.route('/add-show/', methods=['POST'])
def add_show():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        title = data['title']
        year = data['year']
        runtime = data['runtime']
        rating = data['rating']
        overview = data['overview']
        trailer = data['trailer']
        homepage = data['homepage']

        result = db.execute_sql(query.shows_insert_new_show,
                                [title, year, runtime, rating, overview, trailer, homepage],
                                fetch=False)
        if result is None:
            response = {"is_show_add": "YES"}
        else:
            response = {"is_show_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


@app.route('/add-actor/', methods=['POST'])
def add_actor():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        name = data['name']
        birthday = data['birthday']
        death = data['death']
        biography = data['biography']

        if death == '':
            death = None

        result = db.execute_sql(query.actors_insert_new_actor, [name, birthday, death, biography], fetch=False)
        if result is None:
            response = {"is_actor_add": "YES"}
        else:
            response = {"is_actor_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


@app.route('/add-show-actor/', methods=['POST'])
def add_show_actor():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        show_id = data['show_id']
        actor_id = data['actor_id']
        character_name = data['character_name']

        result = db.execute_sql(query.insert_connect_actor_to_show, [show_id, actor_id, character_name], fetch=False)
        if result is None:
            response = {"is_show_char_add": "YES"}
        else:
            response = {"is_show_char_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


@app.route('/add-genre/', methods=['POST'])
def add_genre():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        name = data['name']

        result = db.execute_sql(query.genres_insert_new_genre, [name], fetch=False)
        if result is None:
            response = {"is_genre_add": "YES"}
        else:
            response = {"is_genre_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


@app.route('/add-season/', methods=['POST'])
def add_season():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        show_id = data['show_id']
        title = data['title']
        season_no = data['season_no']
        overview = data['overview']

        result = db.execute_sql(query.seasons_insert_new_season, [show_id, title, season_no, overview], fetch=False)
        if result is None:
            response = {"is_season_add": "YES"}
        else:
            response = {"is_season_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


@app.route('/add-show-genre/', methods=['POST'])
def add_show_genre():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        show_id = data['show_id']
        genre_id = data['genre_id']

        print(show_id, genre_id)

        result = db.execute_sql(query.show_genre_insert_new, [show_id, genre_id], fetch=False)
        if result is None:
            response = {"is_show_genre_add": "YES"}
        else:
            response = {"is_show_genre_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


@app.route('/add-episode/', methods=['POST'])
def add_episode():
    if session.get(SESSION_USER_ID) and session.get(SESSION_USER_LOGIN):
        data = request.get_json()
        season_id = data['season_id']
        title = data['title']
        episode_no = data['episode_no']
        overview = data['overview']

        result = db.execute_sql(query.episodes_insert_new_episode, [season_id, title, episode_no, overview],
                                fetch=False)
        if result is None:
            response = {"is_episode_add": "YES"}
        else:
            response = {"is_episode_add": "NO"}

        return jsonify(response)
    else:
        return redirect('/user-not-login/')


"""+---------------------+"""
"""| PERSONAL ASSESSMENT |"""
"""+---------------------+"""


@app.route('/pa/')
def personal_assessment():
    return render_template('pa.html')


@app.route('/get/shows/title/all/', methods=['POST'])
def get_shows_title():
    result = db.execute_sql_dict(query.shows_select_id_title)

    return jsonify(result)


@app.route('/get/actors/name/all/', methods=['POST'])
def get_actors_all():
    result = db.execute_sql_dict(query.actors_select_name_all)

    return jsonify(result)


@app.route('/get/actors/with/genres/', methods=['POST'])
def get_actors_genres():
    result = db.execute_sql_dict(query.select_actors_genres)

    return jsonify(result)


@app.route('/design')
def design():
    return render_template('design.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    app.run()
