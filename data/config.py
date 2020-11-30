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


# Columns' name for table "actors" (request for pagination)
ACT_COL_NAME = 'name'
ACT_COL_BIRTHDAY = 'birthday'
ACT_COL_DEATH = 'death'
# No of records limitation for the "actors" (request for pagination)
ACT_LIMIT = 50


# Columns' name for the shows selected by a genre (request for pagination)
GS_COL_TITLE = 'title'
GS_COL_YEAR = 'year'
GS_COL_RUNTIME = 'runtime'
GS_COL_RATING = 'rating'
# No of records on the website "genre_shows"
GS_LIMIT = 15  # This value can not be set on 0 (zero)


# Order direction
ORD_ASC = 'ASC'
ORD_DESC = 'DESC'


"""Session variables"""
SESSION_SECRET_KEY = urandom(64)
SESSION_USER_ID = 'users_id'
SESSION_USER_LOGIN = 'users_login'

