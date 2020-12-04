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

    displayShowsTitle: function () {
        pa.mainContainer.innerHTML = '';
        pa.mainContainer.insertAdjacentHTML('beforeend', '<ul>');
        let ulTag = pa.mainContainer.querySelector('ul');

        dataHandler.getShowsAll(function (showTitles) {
            for (let title of showTitles) {
                let liTag = `<li><a href="/show/${title.id}/">${title.title}</a></li>`;
                ulTag.insertAdjacentHTML('beforeend', liTag);
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
}