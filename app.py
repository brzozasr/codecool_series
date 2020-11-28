# from dotenv import load_dotenv

from flask import Flask, render_template

from data.database_handler import *
from data.query import *
from data.query_py import *

# load_dotenv()
app = Flask(__name__)
app.jinja_env.globals.update(set_rating_stars=set_rating_stars)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.context_processor
def inject_variable():
    return dict(
        COL_TITLE=COL_TITLE,
        COL_YEAR=COL_YEAR,
        COL_RUNTIME=COL_RUNTIME,
        COL_RATING=COL_RATING,
        ORD_ASC=ORD_ASC,
        ORD_DESC=ORD_DESC,
        SHOWS_LIMIT=SHOWS_LIMIT
    )


@app.route('/')
def index():
    shows = db.execute_sql_dict(query.shows_select_id_title)
    return render_template('index.html', shows=shows)


@app.route('/shows/', endpoint='shows')
@app.route('/shows/most-rated/', endpoint='most-rated')
@app.route('/shows/<string:column>/<string:order>/<int:page_no>/', endpoint='ordered-pagination')
def get_shows(column=COL_RATING, order=ORD_DESC, page_no=1):
    error = None
    shows_dict = list()
    sql = dict()
    dict_webpages = dict()

    records = db.execute_sql(query.shows_count_records)
    count_records = records[0][0]
    if not is_positive_int(count_records):
        error = f'There is a problem with returned records:\n<br>{records}.'
        return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)

    dict_webpages = pagination_len(count_records, page_no, SHOWS_LIMIT, visible_pagination=5)
    # dict_webpages = pages_dict(count_records, SHOWS_LIMIT)  # all pages
    offset = dict_webpages.get(page_no)
    # current_page_no = current_page(count_records, SHOWS_LIMIT, offset)
    all_pages = pages_number(count_records, SHOWS_LIMIT)

    if sql_query := get_shows_sql(column, order, offset):
        shows_dict = db.execute_sql_dict(sql_query)
        if type(shows_dict) != list:
            error = f'There is a problem with returned data:\n<br>{shows_dict}.'
            shows_dict = list()
            return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)
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
        error = f'There is a problem with returned data:\n<br>{result}.'
        return render_template('show_detail.html', error=error, db_data=db_data, seasons=seasons)

    seasons = db.execute_sql_dict(query.seasons_by_id_show, [show_id])
    if type(seasons) != list:
        error = f'There is a problem with returned data:\n<br>{seasons}.'
        return render_template('show_detail.html', error=error, db_data=db_data, seasons=seasons)

    genres = get_dict(result[0].get('genres_name'), 'genre_name', sort_dict=True)
    if genres:
        genres_str = ''
        for genre in genres:
            genres_str += f"{genre.get('genre_name')}, "
            # genres_str += f"<a href=\"/genre/{genre.get('genre_id')}/\">{genre.get('genre_name')}</a>, "
        genres_str = genres_str[:-2]
    else:
        genres_str = None

    actors = get_dict(result[0].get('actors_name'), 'actor_name', sort_dict=True)
    if actors:
        actors_str = ''
        counter = 0
        for actor_dict in actors:
            actors_str += f"{actor_dict.get('actor_name')}, "
            # actors_str += f"<a href=\"/actor/{actor_dict.get('actor_id')}/\">{actor_dict.get('actor_name')}</a>, "
            counter += 1
            if counter >= 3:
                break
        actors_str = actors_str[:-2]
    else:
        actors_str = None

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
        'show_genres': genres_str,
        'show_actors': actors_str,
    }

    return render_template('show_detail.html', error=error, db_data=db_data, seasons=seasons)


# @app.route('/actor/<int:actor_id>')
# def actor(actor_id):
#     return render_template('actor.html')


@app.route('/design')
def design():
    return render_template('design.html')


def main():
    app.run(debug=False)


if __name__ == '__main__':
    app.run()
