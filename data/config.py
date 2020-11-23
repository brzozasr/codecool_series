from os import urandom

"""Session variables"""
SESSION_SECRET_KEY = urandom(64)
SESSION_USER_ID = 'users_id'
SESSION_USER_LOGIN = 'users_login'

