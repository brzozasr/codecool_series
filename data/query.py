__query_all = {
    'shows_select_id_title':
        """SELECT id, title FROM shows ORDER BY title;""",
    'shows_count_records':
        """SELECT COUNT(id) FROM shows;""",
    'show_details':
        """SELECT id, title, year, round_rating, rating, runtime, overview, trailer, homepage, genres_name, 
        actors_name, characters_name FROM show_details_view WHERE id = %s""",
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
    'actor_filmography':
        """SELECT sh.id AS sh_id, sh.title AS sh_title, ac.id AS ac_id, ac.name AS ac_name
        FROM shows AS sh
        INNER JOIN show_characters AS sc ON sh.id = sc.show_id
        INNER JOIN actors AS ac ON sc.actor_id = ac.id
        WHERE ac.id = %s""",
    'search_show_title':
        """SELECT id, title FROM shows WHERE title ILIKE %s ORDER BY lower(title);""",
    'check_show_title':
        """SELECT id, title FROM shows WHERE lower(title) = lower(%s);""",
    'shows_insert_new_show':
        """INSERT INTO shows (title, year, runtime, rating, overview, trailer, homepage) 
        VALUES (%s, %s, %s, %s, %s, %s, %s);""",
    'seasons_insert_new_season':
        """INSERT INTO seasons (show_id, title, season_number, overview) 
        VALUES (%s, %s, %s, %s);""",
    'check_actor_name':
        """SELECT id, name FROM actors WHERE lower(name) = lower(%s);""",
    'actors_insert_new_actor':
        """INSERT INTO actors (name, birthday, death, biography) 
        VALUES (%s, %s, %s, %s);""",
    'check_genre_name':
        """SELECT id, name FROM genres WHERE lower(name) = lower(%s);""",
    'genres_insert_new_genre':
        """INSERT INTO genres (name) VALUES (%s);""",
    'seasons_select_seasons_title_by_show_id':
        """SELECT id, title FROM seasons WHERE show_id = %s ORDER BY season_number""",
    'episodes_insert_new_episode':
        """INSERT INTO episodes (season_id, title, episode_number, overview) VALUES (%s, %s, %s, %s);""",
    'show_genre_insert_new':
        """INSERT INTO show_genres (show_id, genre_id) VALUES (%s, %s);""",
    'search_actor_name':
        """SELECT id, name FROM actors WHERE name ILIKE %s ORDER BY lower(name);""",
    'insert_connect_actor_to_show':
        """INSERT INTO show_characters (show_id, actor_id, character_name) 
        VALUES (%s, %s, %s);""",
    'actors_select_name_all':
        """SELECT id, name FROM actors ORDER BY name;""",
    'select_actors_genres':
        """SELECT ac.id AS act_id, ac.name AS act_name, string_agg(DISTINCT ge.name, ', ' ORDER BY ge.name) AS genres_name
        FROM actors AS ac
        LEFT JOIN show_characters AS sc ON ac.id = sc.actor_id
        LEFT JOIN shows AS sh ON sc.show_id = sh.id
        LEFT JOIN show_genres AS sg ON sh.id = sg.show_id
        LEFT JOIN genres AS ge ON sg.genre_id = ge.id
        GROUP BY ac.id ORDER BY lower(ac.name);""",
    'select_one_episode':
    """SELECT id, title, episode_number, overview, season_id FROM episodes WHERE id = %s;""",
    'actors_characters_by_show_id':
    """SELECT ac.id, ac.name, sc.character_name
    FROM actors AS ac
    INNER JOIN show_characters AS sc ON ac.id = sc.actor_id
    INNER JOIN shows AS sh ON sc.show_id = sh.id
    WHERE sh.id = %s
    ORDER BY ac.name;""",
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
