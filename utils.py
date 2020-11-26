import math


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


def pagination_len(current_page_no, all_pages, visible_pages=5):
    pass


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


if __name__ == '__main__':
    print(is_positive_int('5'))
