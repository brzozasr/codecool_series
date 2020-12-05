import {dataHandler} from "./data_handler.js";
import {popup} from "./popup.js";

export let pa = {

    paLinks: document.querySelectorAll('.ajax-pa'),

    paLinksEventListener: function () {
        let pageUrl = window.location.pathname;
        if (pageUrl === '/pa/') {
            pa.paLinks.forEach(link => {
                link.addEventListener('click', pa.functionSelector);
            });
        }
    },

    functionSelector: function (evt) {
        let funcId = evt.currentTarget.dataset.paId;

        switch (funcId) {
            case 'display-shows':
                pa.clearPagination();
                pa.displayShowsTitle();
                break;
            case 'display-actors':
                pa.clearPagination();
                pa.displayActors();
                break;
            case 'display-genres':
                pa.clearPagination();
                pa.displayGenres();
                break;
            case 'display-actors-genres':
                pa.clearPagination();
                pa.displayActorsGenres();
                break;
            case 'display-actors-characters':
                pa.clearPagination();
                pa.displayActorsCharacters();
                break;
            default:
                console.log(`Sorry, something went wrong.`);
        }
    },

    mainContainer: document.querySelector('#main-container'),

    tableActorsGenres: `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `,

    clearPagination: function () {
        let paginationDiv = document.querySelector('#pagination_js');
        paginationDiv.innerHTML = '';
    },

    displayActorsCharacters: function (evt) {
        let show_id = evt.currentTarget.dataset.showId;
        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        let showId = {
            "show_id": show_id
        }

        dataHandler.actorsCharactersByShowId(showId, function (astors) {
            for (let actor of astors) {
                let liTag = `<li>${actor.name} (role: ${actor.character_name})</li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
            }
        });
    },

    displayShowsTitle: function (evt) {
        let showData;
        const LIMIT = 15;
        if (evt !== undefined) {
            let evtData = evt.currentTarget.dataset;
            showData = {
                "page_no": evtData.pageNo,
                "limit": LIMIT,
                "offset": evtData.offset
            }
        } else {
            showData = {
                "page_no": 1,
                "limit": LIMIT,
                "offset": 0
            }
        }

        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        dataHandler.getShowsPaging(showData, function (showTitles) {
            for (let title of showTitles.db_data) {
                // let liTag = `<li><a href="/show/${title.id}/">${title.title}</a></li>`;
                let liTag = `<li><a href="javascript:void(0)" data-show-id="${title.id}">${title.title}</a></li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
            }
            pa.pagination(showTitles.records_no, showTitles.current_page, LIMIT);
        });

        setTimeout(pa.actorsGenresAddEventListener, 1000);
    },

    actorsGenresAddEventListener: function () {
        let aLinks = pa.mainContainer.querySelectorAll('a');
        aLinks.forEach(link => {
            link.addEventListener('click', pa.displayActorsCharacters);
        });
    },

    displayActorsGenres: function () {
        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', pa.tableActorsGenres);
        let tbodyTag = pa.mainContainer.querySelector('tbody');

        dataHandler.getActorsGenres(function (actorsGenres) {
            for (let actorGenres of actorsGenres) {
                let trTag = `<tr><td>${actorGenres.act_name}</td><td>${actorGenres.genres_name}</td></tr>`;
                tbodyTag.insertAdjacentHTML('beforeend', trTag);
            }
        });
    },


    displayActors: function () {
        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        dataHandler.getActorsAll(function (actorsName) {
            for (let actor of actorsName) {
                let liTag = `<li><a href="javascript:void(0)" data-actor-id="${actor.id}">${actor.name}</a></li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
            }
        });

        setTimeout(pa.actorsAddEventListener, 2000);
    },

    actorsAddEventListener: function () {
        let aLinks = pa.mainContainer.querySelectorAll('a');
        aLinks.forEach(link => {
            link.addEventListener('click', popup.openPopup);
        });
    },

    displayGenres: function () {
        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        dataHandler.getGenresName(function (genresName) {
            for (let genre of genresName) {
                let liTag = `<li><a href="/genre-shows/${genre.id}/">${genre.name}</a></li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
            }
        });
    },

    pagination: function (recordsNo, currentPage, limit = 15, visiblePages = 5) {
        let paginationDiv = document.querySelector('#pagination_js');
        paginationDiv.innerHTML = '';
        let allPagesArr = [];
        let paginationSet = new Set();
        let pagesNo = Math.ceil(recordsNo / limit);
        if (pagesNo > 1) {
            let middlePaginationPage = Math.ceil(visiblePages / 2);

            let offset = 0;
            let page = 1;
            for (let i = 0; i < pagesNo; i++) {
                let pageLink = `<a href="javascript:void(0)" class="pagination-func" data-page-no="${page}" data-offset="${offset}">${page}</a>`;
                allPagesArr.push(pageLink);
                offset += limit;
                page++;
            }

            let counter = currentPage - middlePaginationPage;
            while (paginationSet.size < visiblePages) {
                if (allPagesArr[counter] !== undefined) {
                    paginationSet.add(allPagesArr[counter]);
                } else if (allPagesArr[counter] === undefined && counter > pagesNo) {
                    if (allPagesArr[(allPagesArr.length - 1) - middlePaginationPage] !== undefined) {
                        paginationSet.add(allPagesArr[(allPagesArr.length - 1) - middlePaginationPage]);
                        allPagesArr.pop();
                    }
                }
                counter++;

                if (counter > 400) {
                    break;
                }
            }

            let paginationArr = Array.from(paginationSet).sort();

            paginationArr.forEach(page => {
                let strToLink = document.createRange().createContextualFragment(page);
                let link = strToLink.querySelector('a');
                let no = link.dataset.pageNo

                if (parseInt(no, 10) === currentPage) {
                    link.classList.add('active');  // class name to highlight current page number
                }
                paginationDiv.insertAdjacentElement('beforeend', link);
            });

            if (visiblePages < pagesNo) {
                let lastOffset = (pagesNo * limit) - limit;
                let currentOffset = (currentPage * limit) - limit;
                let goFirst = `<a href="javascript:void(0)" class="pagination-func" data-page-no="1" data-offset="0">&#10094;&#10094;</a>`;
                let goOneLess = `<a href="javascript:void(0)" class="pagination-func" data-page-no="${currentPage - 1}" data-offset="${currentOffset - limit}">&#10094;</a>`;
                let goLast = `<a href="javascript:void(0)" class="pagination-func" data-page-no="${pagesNo}" data-offset="${lastOffset}">&#10095;&#10095;</a>`
                let goOneMore = `<a href="javascript:void(0)" class="pagination-func" data-page-no="${currentPage + 1}" data-offset="${currentOffset + limit}">&#10095;</a>`;

                if (currentPage > 1 && currentPage < pagesNo) {
                    paginationDiv.insertAdjacentHTML('afterbegin', goOneLess);
                    paginationDiv.insertAdjacentHTML('afterbegin', goFirst);
                    paginationDiv.insertAdjacentHTML('beforeend', goOneMore);
                    paginationDiv.insertAdjacentHTML('beforeend', goLast);
                } else if (currentPage === 1) {
                    paginationDiv.insertAdjacentHTML('beforeend', goOneMore);
                    paginationDiv.insertAdjacentHTML('beforeend', goLast);
                } else if (currentPage === pagesNo) {
                    paginationDiv.insertAdjacentHTML('afterbegin', goOneLess);
                    paginationDiv.insertAdjacentHTML('afterbegin', goFirst);
                }
            }
            let pagesLinks = document.querySelectorAll('.pagination-func');
            pagesLinks.forEach(page => {
                page.addEventListener('click', pa.displayShowsTitle);
            });
        }
    },
}