# from dotenv import load_dotenv
from flask import Flask, render_template, request

from data.database_handler import *
from data.query import *
from data.query_py import *
import math

# load_dotenv()
app = Flask(__name__)
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

    dict_webpages = pages_dict(count_records, SHOWS_LIMIT)
    offset = dict_webpages.get(page_no)

    # current_page_no = current_page(count_records, SHOWS_LIMIT, offset)

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
    }

    return render_template('shows.html', shows_dict=shows_dict, error=error, sql=sql, dict_webpages=dict_webpages)


@app.route('/show/<int:show_id>/')
def show_detail(show_id):
    return render_template('show_detail.html', show_id=show_id)


@app.route('/design')
def design():
    return render_template('design.html')


def main():
    app.run(debug=False)


if __name__ == '__main__':
    app.run()
