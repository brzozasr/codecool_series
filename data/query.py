__query_all = {
    'shows_select_id_title':
        """SELECT id, title FROM shows;""",
    'shows_query':
        """SELECT 
                sh.id, 
                sh.title, 
                sh.year, 
                sh.runtime, 
                ROUND(sh.rating, 1) AS round_rating,
                STRING_AGG(ge.name, ', ' ORDER BY ge.name) AS genres_name, 
                sh.trailer, 
                sh.homepage
            FROM shows AS sh
                LEFT JOIN show_genres AS sg ON sh.id = sg.show_id
                LEFT JOIN genres AS ge ON sg.genre_id = ge.id
            GROUP BY sh.id
            ORDER BY sh.rating DESC
            LIMIT 15 OFFSET 0;"""
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
