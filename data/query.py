__query_all = {
    'shows_select_id_title':
        """SELECT id, title FROM shows ORDER BY title;""",
    'shows_count_records':
        """SELECT COUNT(id) FROM shows;""",
    'show_details':
        """SELECT id, title, year, round_rating, rating, runtime, overview, trailer, homepage, genres_name, actors_name
        FROM show_details_view WHERE id = %s""",
    'seasons_by_id_show':
    """SELECT id, season_number, title, overview, show_id FROM seasons 
    WHERE show_id = %s ORDER BY season_number""",
    'users_select_by_users_login':
        """SELECT users_id, users_login, users_pass FROM users WHERE users_login = %s;""",
    'users_insert_new_user':
        """INSERT INTO users (users_login, users_pass) VALUES (%s, %s);""",
    'actor_get_by_id':
    """SELECT id, name, birthday, death, biography FROM actors WHERE id = %s;""",
    'actors_count_records':
    """SELECT COUNT(id) FROM actors""",
    'episodes_select_by_season_id':
    """SELECT id, title, episode_number, overview, season_id FROM episodes 
    WHERE season_id = %s ORDER BY episode_number""",
    'season_by_id':
    """SELECT se.id, se.season_number, se.title, se.overview, se.show_id, sh.title AS show_title
    FROM shows AS sh
    INNER JOIN seasons AS se ON se.show_id = sh.id
    WHERE se.id = %s""",
    'genres_select_all':
    """SELECT id, name FROM genres ORDER BY name;""",
    'count_genre_shows':
    """SELECT COUNT(sh_id)
    FROM genre_shows_view WHERE ge_id = %s""",
}


class Query:
    def __init__(self, query_dict):
        self.__query = query_dict

    def __getattr__(self, key):
        try:
            return self.__query[key]
        except KeyError as e:
            raise AttributeError(e)


query = Query(__query_all)
