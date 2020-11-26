import os

from psycopg2 import *
from psycopg2.extras import RealDictCursor


class DatabaseTools:
    pg_db = os.environ.get('PG_DB')
    pg_username = os.environ.get('PG_USERNAME')
    pg_password = os.environ.get('PG_PASSWORD')
    pg_host = os.environ.get('PG_HOST')
    pg_port = os.environ.get('PG_PORT')

    def __init__(self):
        self.__db_name = DatabaseTools.pg_db
        self.__username = DatabaseTools.pg_username
        self.__password = DatabaseTools.pg_password
        self.__host = DatabaseTools.pg_host
        self.__port = DatabaseTools.pg_port
        self.__cursor = None
        self.__connection = None

    def execute_sql(self, query, data=None, fetch=True):
        self.__connect_db()
        result = self.__execute_query(query, data, fetch)
        self.__close_connection()
        return result

    def execute_multi_sql(self, query, data: list):
        """ONLY FOR NOT RETURNING QUERY. DO NOT USE 'SELECT' AND 'RETURNING'\n
        Argument "data" has to be a list of lists or a list of tuples.\n
        Example: [['title1', 'question1'], ['title2', 'question2']]."""
        if 'SELECT' not in query.upper() and 'RETURNING' not in query.upper():
            if all([isinstance(el, (list, tuple)) for el in data] + [len(data) > 0]):
                self.__connect_db()
                for sql_data in data:
                    if len(sql_data) > 0:
                        self.__execute_query(query, sql_data, fetch=False)
                self.__close_connection()
            else:
                print('Required data: a list of lists or a list of tuples!')
        else:
            print('Method "execute_multi_sql" ONLY FOR NOT RETURNING QUERY!')

    def execute_sql_dict(self, query, data=None, fetch=True):
        """Return query result as Dictionary (RealDict).
        Use this only for a query SELECT"""
        self.__connect_db(return_dict=True)
        result = self.__execute_query(query, data, fetch)
        self.__close_connection()
        return result

    def __connect_db(self, dbname=pg_db, username=pg_username, pwd=pg_password, return_dict=False):
        if not return_dict:
            try:
                self.__connection = connect(database=dbname, user=username, password=pwd,
                                            host=self.__host, port=self.__port)
                self.__cursor = self.__connection.cursor()
            except Error as e:
                print(f'There is a problem with connection: {e}')
        else:
            try:
                self.__connection = connect(database=dbname, user=username, password=pwd,
                                            host=self.__host, port=self.__port)
                self.__cursor = self.__connection.cursor(cursor_factory=RealDictCursor)
            except Error as e:
                print(f'There is a problem with connection: {e}')

    def __execute_query(self, query, data=None, fetch=True):
        """Execute query with a transaction (with commit).
        Use this for INSERT, UPDATE, DELETE."""
        error = None
        try:
            self.__cursor.execute(query, data)
            if fetch:
                return self.__cursor.fetchall()
        except (Error, OperationalError) as e:
            print(f'There is a problem with operation: {e}')
            error = str(e)
        finally:
            self.__connection.commit()
            if error is not None:
                return f'There is a problem with operation: {error}'

    def __close_connection(self):
        try:
            self.__cursor.close()
            self.__connection.close()
        except Error as e:
            print(f'There is a problem with closing database: {e}')


db = DatabaseTools()
