from utils import *
from data.config import *


def get_shows_sql(column=COL_RATING, order=ORD_DESC, offset=0):
    columns = [COL_TITLE, COL_YEAR, COL_RUNTIME, COL_RATING]
    orders = [ORD_ASC, ORD_DESC]
    if column in columns and order in orders:
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
                LIMIT {SHOWS_LIMIT} OFFSET {offset};"""
        return query
    else:
        return None
