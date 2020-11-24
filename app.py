# from dotenv import load_dotenv
from flask import Flask, render_template
from utils import *

from data.database_handler import *
from data.query import *

# load_dotenv()
app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def index():
    shows = db.execute_sql_dict(query.shows_select_id_title)
    return render_template('index.html', shows=shows)


@app.route('/shows/most-rated')
@app.route('/shows/most-rated/<str:column>/<str:order>/<int:limit>/<int:offset>/')
def get_shows(column="rating", order="DESC", limit=15, offset=0):
    shows_dict = db.execute_sql_dict(get_sql(column, order, limit, offset))
    return render_template('shows.html', shows_dict=shows_dict)


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
