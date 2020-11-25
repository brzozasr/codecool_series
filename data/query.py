__query_all = {
    'shows_select_id_title':
        """SELECT id, title FROM shows;""",
    'shows_count_records':
        """SELECT COUNT(id) FROM shows;""",
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
