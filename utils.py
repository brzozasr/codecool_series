import math
from flask import json
from datetime import datetime


def pages_dict(no_of_records, limit):
    """Returns dictionary with all webpages as:
    key = page number,
    value = offset."""
    pages = dict()
    web_pages = math.ceil(no_of_records / limit)

    count_offset = 0
    for i in range(1, web_pages + 1):
        pages[i] = count_offset
        count_offset += limit

    return pages


def pagination_len(no_of_records: int, current_page_no: int, limit: int, visible_pagination=5) -> dict:
    """Shows only part of pagination. The length of pagination depends on param "visible_pagination".
    :param no_of_records: number of records received from DB,
    :param current_page_no: current page number,
    :param limit: limit of showed records in DB,
    :param visible_pagination: length visible pagination (e.g. for value 5, << 2 3 4 5 6 >>).
    :return: fixed length dictionary with the pages and with length sets by "visible_pagination"
    {1: 0, 2: 15...}, key = no of page, value = offset."""
    pages = dict()
    all_pages_no = math.ceil(no_of_records / limit)
    middle_page = math.ceil(visible_pagination / 2)

    if visible_pagination >= all_pages_no:
        offset = 0
        for page in range(1, all_pages_no + 1):
            pages[page] = offset
            offset += limit
        return pages
    elif visible_pagination < all_pages_no:
        if current_page_no >= middle_page and current_page_no <= ((all_pages_no - visible_pagination) + middle_page):
            offset = limit * (current_page_no - middle_page)
            for page in range((current_page_no - middle_page) + 1,
                              (current_page_no - middle_page) + visible_pagination + 1):
                pages[page] = offset
                offset += limit
            return pages
        elif current_page_no < middle_page:
            offset = 0
            for page in range(1, visible_pagination + 1):
                pages[page] = offset
                offset += limit
            return pages
        elif current_page_no > ((all_pages_no - visible_pagination) + middle_page):
            offset = limit * (all_pages_no - visible_pagination)
            for page in range((all_pages_no - visible_pagination) + 1, all_pages_no + 1):
                pages[page] = offset
                offset += limit
            return pages


# Not used
def current_page(no_of_records, limit, offset):
    """Returns the current webpage number according offset or None."""
    if is_positive_int(offset):
        if offset < no_of_records:
            current_page_no = (offset / limit) + 1
            return int(current_page_no)
        else:
            return None
    else:
        return None


def pages_number(no_of_records: int, limit: int) -> int:
    """Returns all available pages number."""
    return math.ceil(no_of_records / limit)


def is_positive_int(str_no):
    try:
        if type(str_no) == str or type(str_no) == int:
            num = int(str_no)
            if num < 0:
                return False
        else:
            return False
    except ValueError:
        return False
    return True


def get_dict(str_of_dict: str, order_key='', sort_dict=False) -> list:
    """Function returns the list of dicts:
    :param str_of_dict: string got form DB
    (e.g. {"genre_id": 10, "genre_name": "name1"}, {"genre_id": 11, "genre_name": "name12"},...),
    :param order_key: the key by which dictionaries will be sorted (required if flag 'sort_dict=True'),
    :param sort_dict: flag for sorting the dictionary (boolean).
    :return: list of dicts (e.g. [{"genre_id": 10, "genre_name": "name1"}, {"genre_id": 11, "genre_name": "name12"},...])"""
    result_dict = list()
    if str_of_dict:
        result_dict = json.loads('[' + str_of_dict + ']')
        if sort_dict and order_key:
            try:
                result_dict = sorted(result_dict, key=lambda i: i[order_key])
                return result_dict
            except KeyError:
                return result_dict
        return result_dict
    else:
        return result_dict


def get_trailer_id(yt_url):
    """Returns ID of trailer taken from YouTube's url."""
    if yt_url and '?v=' in yt_url:
        trailer_id = yt_url.split('?v=')
        return trailer_id[1]
    else:
        return None


def min_to_h_min(minutes: int):
    """Changing integer to hours and minutes
    and return in format: 1h 09min."""
    if is_positive_int(minutes):
        h = minutes // 60
        m = minutes % 60

        if h > 0 and m > 0:
            if 0 < m < 10:
                return f'{h}h 0{m}min'
            else:
                return f'{h}h {m}min'
        elif h > 0 and m == 0:
            return f'{h}h'
        elif h == 0 and m > 0:
            return f'{m}min'
        else:
            return None
    else:
        return None


def set_rating_stars(rating):
    """Returns HTML string with images of star,
    the number of stars depend on passing argument "rating"."""
    stars = int(rating)
    rest = rating - stars

    star = '<img src="/static/assets/star.png">'
    half_star = '<img src="/static/assets/half_star.png">'

    if rest >= 0.5:
        return star * stars + half_star
    else:
        return star * stars


def date_formater(date_to_format: datetime):
    """Format date from 2020-01-01 to 2020 January 01."""
    if date_to_format:
        return date_to_format.strftime("%Y %B %d")
    else:
        return None


def genres_to_str(genres: list, only_genres=True) -> (str, None):
    """Changing the list of dictionaries "genres":
    [{"genre_id": 5, "genre_name": "Comedy"}, {"genre_id": 8, "genre_name": "Documentary"},...]
    to string: Comedy, Documentary,... or HTML string
    """
    if genres:
        genres_str = ''
        for genre in genres:
            if only_genres:
                genres_str += f"""{genre.get('genre_name')}, """
            else:
                genres_str += f"""<a href="/genre-shows/{genre.get('genre_id')}/" data-genre-id="{genre.get('actor_id')}">{genre.get('genre_name')}</a>, """
        return genres_str[:-2]
    else:
        return None


def actors_to_string(actors: list, characters: list = None, html_actors=False, return_no_actors=3) -> (str, None):
    """Changing the list of dictionaries "actors" and the list of dictionaries "characters" to string or html string:
    to string: Jan Nowak, Ewa Test,... or HTML string.
    :param actors: list of dictionaries with actors [{"actor_id": 2, "actor_name": "Jerzy Stuhr"}, {"actor_id": 3, "actor_name": "Olgierd Łukaszewicz"},...],
    :param characters: list of dictionaries with characters [{"char_id": 2, "char_name": "Maksymilian Paradys"}, {"char_id": 3, "char_name": "Albert Starski"},...],
    :param html_actors: the flag that depend on function returns string of actors or
    HTML string (with links) of actors,
    :param return_no_actors: positive integer pointing how many actors returns or
    if puts string 'ALL' returns all actors.
    """
    if actors and characters is None:
        actors_str = ''
        counter = 0
        for actor in actors:
            if not html_actors:
                actors_str += f"""{actor.get('actor_name')}, """
            else:
                actors_str += f"""<a href="javascript:void(0)" class="popup-link" data-actor-id="{actor.get('actor_id')}">{actor.get('actor_name')}</a>, """
            counter += 1
            if return_no_actors != 'ALL':
                if counter >= return_no_actors:
                    break
        return actors_str[:-2]
    elif actors and characters:
        actors_str = ''
        counter = 0
        for actor in actors:
            for character in characters:
                if not html_actors:
                    if actor.get('actor_id') == character.get('char_id'):
                        if character.get('char_name'):
                            actors_str += f"""{actor.get('actor_name')} (role: {character.get('char_name')}), \n"""
                        else:
                            actors_str += f"""{actor.get('actor_name')}, \n"""
                else:
                    if actor.get('actor_id') == character.get('char_id'):
                        if character.get('char_name'):
                            actors_str += f"""<a href="javascript:void(0)" class="popup-link" data-actor-id="{actor.get('actor_id')}">{actor.get('actor_name')}</a> (role: {character.get('char_name')}), \n"""
                        else:
                            actors_str += f"""<a href="javascript:void(0)" class="popup-link" data-actor-id="{actor.get('actor_id')}">{actor.get('actor_name')}</a>, \n"""
            counter += 1
            if return_no_actors != 'ALL':
                if counter >= return_no_actors:
                    break
        return actors_str[:-3]
    else:
        return None


def replace_quote(replace_str: str):
    if replace_str:
        len_result = len(replace_str)
        if replace_str.find("{") == 0:
            replace_str = replace_str[1:-1]

        if replace_str.rfind("}") == len_result - 1:
            replace_str = replace_str[:-2]

        result_list = replace_str.split('}, {')
        tmp_list = []

        for result in result_list:

            if result.count('"') == 6:
                tmp_list.append('{' + result + '}')
            else:
                new_list = result.split(': ')
                len_new_list = len(new_list)
                if len_new_list > 0:
                    new_char_name = '"' + new_list[len_new_list - 1].replace('"', '') + '"'
                    new_list.pop()
                    new_list.append(new_char_name)
                    newer_list = ': '.join(new_list)
                    tmp_list.append('{' + newer_list + '}')

        return ', '.join(tmp_list)
    else:
        return None


if __name__ == '__main__':
    # print(pages_dict(76, 15))
    # print(pagination_len(76, 6, 15, visible_pagination=5))
    # print(min_to_h_min(70))
    dict_str = '{"genre_id": 5, "genre_name": "Com"ed"y"}'
    print(replace_quote(dict_str))
