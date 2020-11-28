from os import urandom


"""Context variables"""
# Columns' name for table "shows" (request for pagination)
COL_TITLE = 'title'
COL_YEAR = 'year'
COL_RUNTIME = 'runtime'
COL_RATING = 'rating'
# No of records on the website "shows"
SHOWS_LIMIT = 15  # This value can not be set on 0 (zero)


# No of records limitation for the Homepage (request for pagination)
HP_LIMIT = 15



# Order direction
ORD_ASC = 'ASC'
ORD_DESC = 'DESC'


"""Session variables"""
SESSION_SECRET_KEY = urandom(64)
SESSION_USER_ID = 'users_id'
SESSION_USER_LOGIN = 'users_login'

