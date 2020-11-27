__query_all = {
    'shows_select_id_title':
        """SELECT id, title FROM shows;""",
    'shows_count_records':
        """SELECT COUNT(id) FROM shows;""",
    'show_details':
        """SELECT id, title, year, round_rating, rating, runtime, overview, trailer, homepage, genres_name, actors_name
        FROM show_details_view WHERE id = %s""",
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
