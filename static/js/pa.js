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
                pa.displayShowsTitle();
                // pa.pagination(1006, 15, 68, 6)
                break;
            case 'display-actors':
                pa.displayActors();
                break;
            case 'display-genres':
                pa.displayGenres();
                break;
            case 'display-actors-genres':
                pa.displayActorsGenres();
                break;
            case 'display-actors-characters':
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

    displayActorsCharacters: function (evt) {
        let show_id = evt.currentTarget.dataset.showId;

        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        let showId = {
            "show_id": show_id
        }

        dataHandler.actorsCharactersByShowId(showId,function (astors) {
            for (let actor of astors) {
                let liTag = `<li>${actor.name} (role: ${actor.character_name})</li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
            }
        });
    },

     displayShowsTitle: function () {
        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        dataHandler.getShowsAll(function (showTitles) {
            for (let title of showTitles) {
                // let liTag = `<li><a href="/show/${title.id}/">${title.title}</a></li>`;
                let liTag = `<li><a href="javascript:void(0)" data-show-id="${title.id}">${title.title}</a></li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
            }
        });

        setTimeout(pa.actorsGenresAddEventListener, 1000)
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


    // Not working correctly
    pagination: function (recordsNo, limit, currentPage, visiblePages = 5) {
        let paginationDiv = document.querySelector('.pagination');
        let allPagesArr = [];
        let paginationArr = [];
        let pagesNo = Math.ceil(recordsNo / limit);
        if (pagesNo > 1) {
            let middlePaginationPage = Math.ceil(visiblePages / 2);

            let offset = 0;
            let page = 1;
            for (let i = 0; i < pagesNo; i++) {
                let pageLink = `<a href="javascript:void(0)" data-page-no="${page}" data-offset="${offset}">${page}</a>`;
                allPagesArr.push(pageLink);
                offset += limit;
                page++;
            }

            let counter = currentPage - middlePaginationPage;
            console.log(counter)
            while (paginationArr.length < visiblePages) {
                console.log(allPagesArr[counter])
                if (allPagesArr[counter] !== undefined) {
                    paginationArr.push(allPagesArr[counter]);
                } else if (allPagesArr[counter] === undefined && counter > pagesNo) {
                    console.log('rrrr')
                    if (allPagesArr[(allPagesArr.length - 1) - middlePaginationPage] !== undefined) {
                        paginationArr.push(allPagesArr[(allPagesArr.length - 1) - middlePaginationPage]);
                        console.log(allPagesArr[(allPagesArr.length - 1) - middlePaginationPage])
                        allPagesArr.pop();
                        // paginationArr.push(allPagesArr[(allPagesArr.length - 1) - middlePaginationPage]);

                    }
                }
                counter++;

                if (counter > 400) {
                    break;
                }
            }

            paginationArr.sort()

            console.log(paginationArr)

            paginationArr.forEach(page => {
                let link = document.createRange().createContextualFragment(page);
                let no = link.querySelector('a');
                paginationDiv.insertAdjacentHTML('beforeend', page);


            });
        }
    },
}