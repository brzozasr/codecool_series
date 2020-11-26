from os import urandom


"""Context variables"""
# Columns name in table "shows"
COL_TITLE = 'title'
COL_YEAR = 'year'
COL_RUNTIME = 'runtime'
COL_RATING = 'rating'
# Order direction
ORD_ASC = 'ASC'
ORD_DESC = 'DESC'
# No of records on the website
SHOWS_LIMIT = 15


"""Session variables"""
SESSION_SECRET_KEY = urandom(64)
SESSION_USER_ID = 'users_id'
SESSION_USER_LOGIN = 'users_login'

