# from dotenv import load_dotenv
from flask import Flask, render_template

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
def get_shows():
    shows_dict = db.execute_sql_dict(query.shows_query)
    return render_template('shows.html', shows_dict=shows_dict)


@app.route('/design')
def design():
    return render_template('design.html')


def main():
    app.run(debug=False)


if __name__ == '__main__':
    app.run()
