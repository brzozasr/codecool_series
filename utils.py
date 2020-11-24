def get_sql(column="rating", order="DESC", limit=15, offset=0):
    columns = ["title", "year", "runtime", "rating"]
    orders = ['DESC', 'ASC']
    if column in columns and order in orders and is_positive_int(limit) and is_positive_int(offset):
        query = f"""SELECT 
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
                ORDER BY sh.{column} {order}
                LIMIT {limit} OFFSET {offset};"""
        return query
    else:
        return None


def is_positive_int(str_no):
    try:
        num = int(str_no)
        if num < 0:
            return False
    except ValueError:
        return False
    return True


if __name__ == '__main__':
    print(is_positive_int('5'))
