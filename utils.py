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


def pagination_len(no_of_records: int, current_page_no: int, limit: int, visible_pagination=5) -> dict:
    """Shows only part of pagination. The length of pagination depends on param "visible_pagination".
    :param no_of_records: number of records received from DB
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


if __name__ == '__main__':
    print(pages_dict(76, 15))
    print(pagination_len(76, 6, 15, visible_pagination=5))
