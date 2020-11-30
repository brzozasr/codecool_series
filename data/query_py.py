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


def get_title_shows_sql(order=ORD_DESC, offset=0):
    orders = [ORD_ASC, ORD_DESC]
    if order in orders:
        query = f"""SELECT 
                    id, 
                    title 
                FROM shows 
                ORDER BY title {order}
                LIMIT {HP_LIMIT} OFFSET {offset};"""
        return query
    else:
        return None


def get_all_actors_sql(column=ACT_COL_NAME, order=ORD_DESC, offset=0):
    columns = [ACT_COL_NAME, ACT_COL_BIRTHDAY, ACT_COL_DEATH]
    orders = [ORD_ASC, ORD_DESC]
    if column in columns and order in orders:
        query = f"""SELECT 
                    id, 
                    name,
                    birthday, 
                    death, 
                    biography
                FROM actors 
                ORDER BY {column} {order}
                LIMIT {ACT_LIMIT} OFFSET {offset};"""
        return query
    else:
        return None


def get_genre_shows_sql(genre_id, column=GS_COL_RATING, order=ORD_DESC, offset=0):
    columns = [GS_COL_TITLE, GS_COL_YEAR, GS_COL_RUNTIME, GS_COL_RATING]
    orders = [ORD_ASC, ORD_DESC]
    if column in columns and order in orders:
        query = f"""SELECT 
                        sh_id, 
                        sh_title, 
                        sh_year, 
                        sh_overview, 
                        sh_runtime, 
                        sh_trailer, 
                        sh_homepage, 
                        sh_rating, 
                        ge_name, 
                        ge_id
                    FROM genre_shows_view 
                        WHERE ge_id = {genre_id}
                    ORDER BY {column} {order}
                    LIMIT {GS_LIMIT} OFFSET {offset};"""
        return query
    else:
        return None
