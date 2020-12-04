import {dataHandler} from "./data_handler.js";

export let popupForm = {

    outputDiv: `
        <div id="output-container">
            <div></div>
        </div>
    `,

    popupFormMain: function (form) {
        let codeHtml =
            `<div id="popup-form-main">
            <div id="popup-form-div" class="bg-form-div">
            <img id="popup-form-close" src="/static/assets/close.png" alt="X">
            ${form}
            </div>
        </div>`;
        return codeHtml;
    },

    formShows: `
        <p class="text-center">ADD SHOW:</p>
        <form action="#" method="post" autocomplete="off" id="form-show">
            <p class="form-element">
                <label class="form-element-label" for="form-show-title">Title:</label>
                <input type="text" name="form-show-title" id="form-show-title" value="" placeholder="Title of show" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-year">Release date:</label>
                <input type="date" name="season" id="form-show-year" value="" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-runtime">Length:</label>
                <input type="number" name="form-show-runtime" id="form-show-runtime" value="1" min="1" max="999" required>
                <span>min.</span>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-rating">Rating:</label>
                <input type="number" name="form-show-rating" id="form-show-rating" value="1.0" min="0" max="10" step="0.1" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-overview">Overview:</label>
                <textarea id="form-show-overview" name="form-show-overview" class="size-textarea" placeholder="Show summary" required></textarea>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-trailer">Trailer:</label>
                <input type="text" name="form-show-trailer" id="form-show-trailer" value="" placeholder="Link to the trailer">
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-homepage">Homepage:</label>
                <input type="text" name="form-show-homepage" id="form-show-homepage" value="" placeholder="Link to the homepage">
            </p>
            <p class="text-center">
                <button type="button" id="form-show-submit">Add show</button>
            </p>
        </form>
    `,

    formActors: `
        <p class="text-center">ADD ACTOR:</p>
        <form action="#" method="post" autocomplete="off" id="form-actor">
            <p class="form-element">
                <label class="form-element-label" for="form-actor-name">Name:</label>
                <input name="form-actor-name" id="form-actor-name" value="" placeholder="Actor's name" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-actor-birthday">Birthday:</label>
                <input type="date" name="form-actor-birthday" id="form-actor-birthday" value="" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-actor-death">Death:</label>
                <input type="date" name="form-actor-death" id="form-actor-death" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-actor-biography">Biography:</label>
                <textarea id="form-actor-biography" name="form-actor-biography" class="size-textarea" placeholder="Actor's biography" required></textarea>
            </p>
            <p class="text-center">
                <button type="button" id="form-actor-submit">Add actor</button>
            </p>
        </form>
    `,

    formGenres: `
        <p class="text-center">ADD GENRE:</p>
        <form action="#" method="post" autocomplete="off" id="form-genre">
            <p class="form-element">
                <label class="form-element-label" for="form-genre-name">Genre:</label>
                <input name="form-genre-name" id="form-genre-name" value="" placeholder="Name of genre" required>
            </p>
            <p class="text-center">
                <button type="button" id="form-genre-submit">Add genre</button>
            </p>
        </form>
    `,

    formSeasons: `
        <p class="text-center">ADD SEASON:</p>
        <form action="#" method="post" autocomplete="off" id="form-season">
            <div class="form-element">
                <label class="form-element-label" for="form-season-show-id">Title of show:</label>
                <div class="form-div-element">
                    <input type="text" name="form-season-show-id" id="form-season-show-id" style="background-color: #d9d9d9;" value="" placeholder="Click to search a title" readonly required>
                    <div class="form-div-dropdown" id="form-season-dropdown">
                        <input type="text" placeholder="Search..." id="form-season-search" class="form-search">
                    </div>
                </div>
            </div>
            <p class="form-element">
                <label class="form-element-label" for="form-season-title">Title of season:</label>
                <input type="text" name="form-season-title" id="form-season-title" value="" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-season-number">Season No:</label>
                <input type="number" name="form-season-number" id="form-season-number" value="1" min="0" max="999" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-season-overview">Overview:</label>
                <textarea id="form-season-overview" name="form-season-overview" class="size-textarea" placeholder="Season summary" required></textarea>
            </p>
            <p class="text-center">
                <button type="button" id="form-season-submit">Add season</button>
            </p>
        </form>
    `,

    formEpisodes: `
        <p class="text-center">ADD EPISODE:</p>
        <form action="#" method="post" autocomplete="off" id="form-episode">
            <div class="form-element">
                <label class="form-element-label" for="form-episode-show-id">Title of show:</label>
                <div class="form-div-element">
                    <input type="text" name="form-episode-show-id" id="form-episode-show-id" style="background-color: #d9d9d9;" value="" placeholder="Click to search a title" readonly required>
                    <div class="form-div-dropdown" id="form-episode-dropdown">
                        <input type="text" placeholder="Search..." id="form-episode-show-search" class="form-search">
                    </div>
                </div>
            </div>
            <p class="form-element">
                <label class="form-element-label" for="form-episode-season-title">Title of season:</label>
                <select name="form-episode-season-title" id="form-episode-season-title" class="select-size" required>
                    <option value="">Choose a season</option>
                </select>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-episode-title">Title of episode:</label>
                <input type="text" name="form-episode-title" id="form-episode-title" value="" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-episode-number">Episode No:</label>
                <input type="number" name="form-episode-number" id="form-episode-number" value="1" min="0" max="999" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-episode-overview">Overview:</label>
                <textarea id="form-episode-overview" name="form-episode-overview" class="size-textarea" placeholder="Episode summary" required></textarea>
            </p>
            <p class="text-center">
                <button type="button" id="form-episode-submit">Add episode</button>
            </p>
        </form>
    `,

    formShowGenre: `
        <p class="text-center">ADD GENRE TO SHOW:</p>
        <form action="#" method="post" autocomplete="off" id="form-show-genre">
            <div class="form-element">
                <label class="form-element-label" for="form-show-genre-show-id">Title of show:</label>
                <div class="form-div-element">
                    <input type="text" name="form-show-genre-show-id" id="form-show-genre-show-id" style="background-color: #d9d9d9;" value="" placeholder="Click to search a title" readonly required>
                    <div class="form-div-dropdown" id="form-show-genre-dropdown">
                        <input type="text" placeholder="Search..." id="form-show-genre-show-search" class="form-search">
                    </div>
                </div>
            </div>
            <p class="form-element">
                <label class="form-element-label" for="form-show-genre-genre-name">Genre:</label>
                <select name="form-show-genre-genre-name" id="form-show-genre-genre-name" class="select-size v-align" size="10" required>
                </select>
            </p>
            <p class="text-center">
                <button type="button" id="form-show-genre-submit">Add</button>
            </p>
        </form>
    `,

    formShowChar: `
        <p class="text-center">ADD ACTOR TO SHOW:</p>
        <form action="#" method="post" autocomplete="off" id="form-show-char">
            <div class="form-element">
                <label class="form-element-label" for="form-show-char-show-id">Title of show:</label>
                <div class="form-div-element">
                    <input type="text" name="form-show-char-show-id" id="form-show-char-show-id" style="background-color: #d9d9d9;" value="" placeholder="Click to search a title" readonly required>
                    <div class="form-div-dropdown" id="form-show-char-show-dropdown">
                        <input type="text" placeholder="Search..." id="form-show-char-show-search" class="form-search">
                    </div>
                </div>
            </div>
            <p class="form-element">
                <div class="form-element">
                    <label class="form-element-label" for="form-show-char-actor-id">Actor's name:</label>
                    <div class="form-div-element">
                        <input type="text" name="form-show-char-actor-id" id="form-show-char-actor-id" style="background-color: #d9d9d9;" value="" placeholder="Click to search a title" readonly required>
                        <div class="form-div-dropdown" id="form-show-char-actor-dropdown">
                            <input type="text" placeholder="Search..." id="form-show-char-actor-search" class="form-search">
                        </div>
                    </div>
                </div>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-char-name">Character name:</label>
                <input type="text" name="form-show-char-name" id="form-show-char-name" value="" required>
            </p>
            <p class="text-center">
                <button type="button" id="form-show-char-submit">Add</button>
            </p>
        </form>
    `,

    divTopBar: document.getElementById('body-wrapper'),

    formLinks: document.querySelectorAll('.link-form-add'),

    formLinksEventListener: function () {
        let pageUrl = window.location.pathname;
        if (pageUrl === '/add/') {
            popupForm.formLinks.forEach(link => {
                link.addEventListener('click', popupForm.openFormPopup);
            });
        }
    },

    openFormPopup: function (evt) {
        let fId = evt.currentTarget.dataset.formId;
        let formHtml;

        switch (fId) {
            case 'form-shows':
                formHtml = popupForm.formShows;
                popupForm.displayPopupForm(formHtml);
                popupForm.addShowsListeners();
                popupForm.isEmptyFields('form-show', 'form-show-submit', 'form-show-title',
                    'form-show-year', 'form-show-runtime', 'form-show-rating', 'form-show-overview');
                popupForm.disableSubmitBtn(true, 'form-show-submit');
                break;
            case 'form-actors':
                formHtml = popupForm.formActors;
                popupForm.displayPopupForm(formHtml);
                popupForm.addActorsListeners();
                popupForm.isEmptyFields('form-actor', 'form-actor-submit', 'form-actor-name',
                    'form-actor-birthday', 'form-actor-biography');
                popupForm.disableSubmitBtn(true, 'form-actor-submit');
                break;
            case 'form-genres':
                formHtml = popupForm.formGenres;
                popupForm.displayPopupForm(formHtml);
                popupForm.addGenresListeners();
                popupForm.isEmptyFields('form-genre', 'form-genre-submit', 'form-genre-name');
                popupForm.disableSubmitBtn(true, 'form-genre-submit');
                break;
            case 'form-seasons':
                formHtml = popupForm.formSeasons;
                popupForm.displayPopupForm(formHtml);
                popupForm.addSeasonsListeners();
                popupForm.isEmptyFields('form-season', 'form-season-submit', 'form-season-show-id',
                    'form-season-title', 'form-season-number');
                popupForm.disableSubmitBtn(true, 'form-season-submit');
                break;
            case 'form-episodes':
                formHtml = popupForm.formEpisodes;
                popupForm.displayPopupForm(formHtml);
                popupForm.addEpisodesListeners();
                popupForm.isEmptyFields('form-episode', 'form-episode-submit', 'form-episode-season-title',
                    'form-episode-title', 'form-episode-number');
                popupForm.disableSubmitBtn(true, 'form-episode-submit');
                break;
            case 'form-genre-show':
                formHtml = popupForm.formShowGenre;
                popupForm.displayPopupForm(formHtml);
                popupForm.addShowGenreListeners();
                popupForm.fillShowGenreSelect();
                popupForm.isEmptyFields('form-show-genre', 'form-show-genre-submit',
                    'form-show-genre-show-id', 'form-show-genre-genre-name');
                popupForm.disableSubmitBtn(true, 'form-show-genre-submit');
                break;
            case 'form-actor-show':
                formHtml = popupForm.formShowChar;
                popupForm.displayPopupForm(formHtml);
                popupForm.addShowCharListeners();
                popupForm.isEmptyFields('form-show-char', 'form-show-char-submit',
                    'form-show-char-show-id', 'form-show-char-actor-id', 'form-show-char-name');
                popupForm.disableSubmitBtn(true, 'form-show-char-submit');
                break;
            default:
                formHtml = '';
        }

        let closeImage = document.getElementById('popup-form-close');
        closeImage.addEventListener('click', popupForm.closePopupForm);
    },

    displayPopupForm: function (html) {
        popupForm.divTopBar.insertAdjacentHTML('beforebegin', popupForm.popupFormMain(html));
        let popupFormDiv = document.getElementById('popup-form-main');
        popupFormDiv.style.display = 'block';
    },

    closePopupForm: function () {
        let popupFormDiv = document.getElementById('popup-form-main');
        popupFormDiv.style.display = 'none';
        popupFormDiv.remove();
    },

    disableSubmitBtn: function (disabled = false, idSubmitBtn) {
        let btnSubmit = document.getElementById(idSubmitBtn);
        if (disabled === true) {
            btnSubmit.disabled = true;
            btnSubmit.style.cursor = 'not-allowed';
        } else {
            btnSubmit.disabled = false;
            btnSubmit.style.cursor = 'pointer'
        }
    },

    isEmptyFields: function (idForm, idSubmitBtn, ...idFields) {
        let form = document.getElementById(idForm);
        form.addEventListener('input', function () {
            for (let idField of idFields) {
                let field = document.getElementById(idField);
                if (field.value.length === 0) {
                    popupForm.disableSubmitBtn(true, idSubmitBtn);
                    console.log('if block')
                    break;
                } else {
                    popupForm.disableSubmitBtn(false, idSubmitBtn);
                    console.log('else unblock')
                }
            }
        });
    },

    simulateInputEvent: function (element) {
        let event = document.createEvent('Event');
        event.initEvent('input', true, true);
        element.dispatchEvent(event);
    },

    addOutput: function (text, isOk = true) {
        popupForm.divTopBar.insertAdjacentHTML('beforebegin', popupForm.outputDiv);
        let output = document.getElementById('output-container');
        let innerDiv = output.firstElementChild;
        if (isOk === true) {
            innerDiv.setAttribute('class', 'output-ok');
        } else {
            innerDiv.setAttribute('class', 'output-wrong');
        }
        innerDiv.innerHTML = text;
        output.style.display = 'block';
    },

    removeOutput: function () {
        let output = document.getElementById('output-container');
        output.style.display = 'none';
        output.remove()
    },


    /** === BEGIN = ADD SHOW FORM ========================================== */
    addShowsListeners: function () {
        let inputTxTitle = document.querySelector('#form-show-title');
        let submitBtn = document.querySelector('#form-show-submit');

        inputTxTitle.addEventListener('input', popupForm.showsOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.showsOnSubmit);
    },

    showsOnChangeInputTx: function (evt) {
        let inputTxTitle = document.querySelector('#form-show-title').parentNode;

        let txt = evt.currentTarget.value;
        if (txt.length > 0) {
            let checkStr = {
                "title": txt
            }
            dataHandler.checkShowTitle(checkStr, function (title_available) {
                if (title_available['is_title_in_db'] === 'NO') {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element ok-16');
                    // popupForm.disableSubmitBtn(false, 'form-show-submit');
                } else if (title_available['is_title_in_db'] === 'YES') {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element info-title');
                    // popupForm.disableSubmitBtn(true, 'form-show-submit');
                } else {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element info-title');
                    // popupForm.disableSubmitBtn(true, 'form-show-submit');
                }
            });
        } else {
            inputTxTitle.removeAttribute('class');
            inputTxTitle.setAttribute('class', 'form-element');
            // popupForm.disableSubmitBtn(false, 'form-show-submit');
        }
    },

    showsOnSubmit: function () {
        let showData = {
            "title": document.getElementById('form-show-title').value,
            "year": document.getElementById('form-show-year').value,
            "runtime": document.getElementById('form-show-runtime').value,
            "rating": document.getElementById('form-show-rating').value,
            "overview": document.getElementById('form-show-overview').value,
            "trailer": document.getElementById('form-show-trailer').value,
            "homepage": document.getElementById('form-show-homepage').value
        }

        dataHandler.addShow(showData, function (confirmation) {
            if (confirmation['is_show_add'] === 'YES') {
                popupForm.removeFromShow();

                popupForm.addOutput('The show has been added to the database.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromShow();

                popupForm.addOutput('The show has not been added to the database.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },

    removeFromShow: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD SHOW FORM ============================================= */


    /** === BEGIN = ADD ACTOR FORM ========================================== */
    addActorsListeners: function () {
        let inputTxTitle = document.querySelector('#form-actor-name');
        let submitBtn = document.querySelector('#form-actor-submit');

        inputTxTitle.addEventListener('input', popupForm.actorsOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.actorsOnSubmit);
    },

    actorsOnChangeInputTx: function (evt) {
        let inputTxTitle = document.querySelector('#form-actor-name').parentNode;

        let txt = evt.currentTarget.value;
        if (txt.length > 0) {
            let checkStr = {
                "name": txt
            }
            dataHandler.checkActorName(checkStr, function (name_available) {
                if (name_available['is_name_in_db'] === 'NO') {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element ok-16');
                } else if (name_available['is_name_in_db'] === 'YES') {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element info-name');
                } else {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element info-name');
                }
            });
        } else {
            inputTxTitle.removeAttribute('class');
            inputTxTitle.setAttribute('class', 'form-element');
        }
    },

    actorsOnSubmit: function () {
        let actorData = {
            "name": document.getElementById('form-actor-name').value,
            "birthday": document.getElementById('form-actor-birthday').value,
            "death": document.getElementById('form-actor-death').value,
            "biography": document.getElementById('form-actor-biography').value
        }

        dataHandler.addActor(actorData, function (confirmation) {
            if (confirmation['is_actor_add'] === 'YES') {
                popupForm.removeFromActor();

                popupForm.addOutput('The actor has been added to the database.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromActor();

                popupForm.addOutput('The actor has not been added to the database.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },

    removeFromActor: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD ACTOR FORM ============================================ */


    /** === BEGIN = ADD GENRE FORM ========================================== */
    addGenresListeners: function () {
        let inputTxTitle = document.querySelector('#form-genre-name');
        let submitBtn = document.querySelector('#form-genre-submit');

        inputTxTitle.addEventListener('input', popupForm.genresOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.genresOnSubmit);
    },

    genresOnChangeInputTx: function (evt) {
        let inputTxTitle = document.querySelector('#form-genre-name').parentNode;

        let txt = evt.currentTarget.value;
        if (txt.length > 0) {
            let checkStr = {
                "name": txt
            }
            dataHandler.checkGenreName(checkStr, function (genre_available) {
                if (genre_available['is_genre_in_db'] === 'NO') {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element ok-16');
                    popupForm.disableSubmitBtn(false, 'form-genre-submit');
                } else if (genre_available['is_genre_in_db'] === 'YES') {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element error-genre');
                    popupForm.disableSubmitBtn(true, 'form-genre-submit');
                } else {
                    inputTxTitle.removeAttribute('class');
                    inputTxTitle.setAttribute('class', 'form-element error-genre');
                    popupForm.disableSubmitBtn(true, 'form-genre-submit');
                }
            });
        } else {
            inputTxTitle.removeAttribute('class');
            inputTxTitle.setAttribute('class', 'form-element');
        }
    },

    genresOnSubmit: function () {
        let genreData = {
            "name": document.getElementById('form-genre-name').value
        }

        dataHandler.addGenre(genreData, function (confirmation) {
            if (confirmation['is_genre_add'] === 'YES') {
                popupForm.removeFromGenre();

                popupForm.addOutput('The genre has been added to the database.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromGenre();

                popupForm.addOutput('The genre has not been added to the database.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },

    removeFromGenre: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD GENRE FORM ============================================== */


    /** === BEGIN = ADD SEASON FORM ========================================== */
    addSeasonsListeners: function () {
        let inputTxTitle = document.querySelector('#form-season-show-id');
        let inputTxSearch = document.querySelector('#form-season-search');
        let submitBtn = document.querySelector('#form-season-submit');

        inputTxTitle.addEventListener('click', popupForm.seasonOnClickInputTx);
        inputTxSearch.addEventListener('input', popupForm.seasonOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.seasonOnSubmit);
    },

    seasonOnClickInputTx: function () {
        let dropdownDiv = document.getElementById('form-season-dropdown');

        dropdownDiv.style.display = 'block';
    },

    seasonOnChangeInputTx: function (evt) {
        let dropdownDiv = document.getElementById('form-season-dropdown');
        let txt = evt.currentTarget.value;

        let data = {
            "phrase": txt
        }
        dataHandler.searchShowTitle(data, function (showTitle) {
            let linksTmp = document.querySelectorAll("#form-season-dropdown > a");
            if (txt.length > 0) {
                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }

                for (let title of showTitle) {

                    let link = `<a href="javascript:void(0)" data-show-id="${title.id}" data-show-title="${title.title}">${title['title']}</a>\n`;
                    dropdownDiv.insertAdjacentHTML('beforeend', link);
                }

                let aLinks = dropdownDiv.querySelectorAll('a');
                aLinks.forEach(link => {
                    link.addEventListener('click', popupForm.seasonAddToInputTxTitle);
                });

                dropdownDiv.style.display = 'block';
            } else {
                dropdownDiv.style.display = 'none';

                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }
            }
        });
    },

    seasonAddToInputTxTitle: function (evt) {
        let titleSet = evt.currentTarget.dataset;
        let dropdownDiv = document.getElementById('form-season-dropdown');
        let inputTxTitle = document.getElementById('form-season-show-id');

        inputTxTitle.value = titleSet.showTitle;
        inputTxTitle.setAttribute("data-show-id", titleSet.showId);
        inputTxTitle.setAttribute("data-show-title", titleSet.showTitle);
        dropdownDiv.style.display = 'none';

        let linksTmp = document.querySelectorAll("#form-season-dropdown > a");
        if (linksTmp !== null) {
            linksTmp.forEach(element => {
                element.remove();
            });
        }

        let searchInput = document.querySelector("#form-season-search");
        searchInput.value = "";

        popupForm.simulateInputEvent(inputTxTitle);
    },

    seasonOnSubmit: function () {
        let seasonData = {
            "show_id": document.getElementById('form-season-show-id').dataset.showId,
            "title": document.getElementById('form-season-title').value,
            "season_no": document.getElementById('form-season-number').value,
            "overview": document.getElementById('form-season-overview').value
        }

        dataHandler.addSeason(seasonData, function (confirmation) {
            if (confirmation['is_season_add'] === 'YES') {
                popupForm.removeFromSeason();

                popupForm.addOutput('The season has been added to the database.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromSeason();

                popupForm.addOutput('The season has not been added to the database.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },


    removeFromSeason: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD SEASON FORM ============================================== */


    /** === BEGIN = ADD EPISODE FORM =========================================== */
    addEpisodesListeners: function () {
        let inputTxTitle = document.querySelector('#form-episode-show-id');
        let inputTxSearch = document.querySelector('#form-episode-show-search');
        let submitBtn = document.querySelector('#form-episode-submit');

        inputTxTitle.addEventListener('click', popupForm.episodeOnClickInputTx);
        inputTxSearch.addEventListener('input', popupForm.episodeOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.episodeOnSubmit);
    },

    episodeOnClickInputTx: function () {
        let dropdownDiv = document.getElementById('form-episode-dropdown');

        dropdownDiv.style.display = 'block';
    },

    episodeOnChangeInputTx: function (evt) {
        let dropdownDiv = document.getElementById('form-episode-dropdown');
        let txt = evt.currentTarget.value;

        let data = {
            "phrase": txt
        }
        dataHandler.searchShowTitle(data, function (showTitle) {
            let linksTmp = document.querySelectorAll("#form-episode-dropdown > a");
            if (txt.length > 0) {
                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }

                for (let title of showTitle) {

                    let link = `<a href="javascript:void(0)" data-show-id="${title.id}" data-show-title="${title.title}">${title['title']}</a>\n`;
                    dropdownDiv.insertAdjacentHTML('beforeend', link);
                }

                let aLinks = dropdownDiv.querySelectorAll('a');
                aLinks.forEach(link => {
                    link.addEventListener('click', popupForm.episodeAddToInputTxTitle);
                });

                dropdownDiv.style.display = 'block';
            } else {
                dropdownDiv.style.display = 'none';

                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }
            }
        });
    },

    episodeAddToInputTxTitle: function (evt) {
        let titleSet = evt.currentTarget.dataset;
        let dropdownDiv = document.getElementById('form-episode-dropdown');
        let inputTxTitle = document.getElementById('form-episode-show-id');

        inputTxTitle.value = titleSet.showTitle;
        inputTxTitle.setAttribute("data-show-id", titleSet.showId);
        inputTxTitle.setAttribute("data-show-title", titleSet.showTitle);
        dropdownDiv.style.display = 'none';

        let linksTmp = document.querySelectorAll("#form-episode-dropdown > a");
        if (linksTmp !== null) {
            linksTmp.forEach(element => {
                element.remove();
            });
        }

        let searchInput = document.querySelector("#form-episode-show-search");
        searchInput.value = "";

        popupForm.fillSeasonsSelect(titleSet.showId);
        popupForm.disableSubmitBtn(true, 'form-episode-submit');
    },

    fillSeasonsSelect: function (show_id) {
        let seasonsSelect = document.querySelector('#form-episode-season-title');
        let seasonOption = document.querySelectorAll('#form-episode-season-title > option');

        seasonOption.forEach(option => {
            if (option.value !== '') {
                option.remove()
            }
        });

        let showID = {
            "show_id": show_id
        };

        dataHandler.seasonTitleByShowId(showID, function (seasonsData) {
            seasonsData.forEach(season => {
                let option = `<option value="${season.id}">${season.title}</option>`
                seasonsSelect.insertAdjacentHTML('beforeend', option);
            });
        });
    },

    episodeOnSubmit: function () {
        let episodeData = {
            "season_id": document.getElementById('form-episode-season-title').value,
            "title": document.getElementById('form-episode-title').value,
            "episode_no": document.getElementById('form-episode-number').value,
            "overview": document.getElementById('form-episode-overview').value
        }

        dataHandler.addEpisode(episodeData, function (confirmation) {
            if (confirmation['is_episode_add'] === 'YES') {
                popupForm.removeFromEpisode();

                popupForm.addOutput('The episode has been added to the database.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromEpisode();

                popupForm.addOutput('The episode has not been added to the database.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },

    removeFromEpisode: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD EPISODE FORM ============================================= */


    /** === BEGIN = ADD GENRE TO SHOW FORM =========================================== */
    addShowGenreListeners: function () {
        let inputTxTitle = document.querySelector('#form-show-genre-show-id');
        let inputTxSearch = document.querySelector('#form-show-genre-show-search');
        let submitBtn = document.querySelector('#form-show-genre-submit');

        inputTxTitle.addEventListener('click', popupForm.showGenreOnClickInputTx);
        inputTxSearch.addEventListener('input', popupForm.showGenreOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.showGenreOnSubmit);
    },

    showGenreOnClickInputTx: function () {
        let dropdownDiv = document.getElementById('form-show-genre-dropdown');

        dropdownDiv.style.display = 'block';
    },

    showGenreOnChangeInputTx: function (evt) {
        let dropdownDiv = document.getElementById('form-show-genre-dropdown');
        let txt = evt.currentTarget.value;

        let data = {
            "phrase": txt
        }
        dataHandler.searchShowTitle(data, function (showTitle) {
            let linksTmp = document.querySelectorAll("#form-show-genre-dropdown > a");
            if (txt.length > 0) {
                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }

                for (let title of showTitle) {

                    let link = `<a href="javascript:void(0)" data-show-id="${title.id}" data-show-title="${title.title}">${title['title']}</a>\n`;
                    dropdownDiv.insertAdjacentHTML('beforeend', link);
                }

                let aLinks = dropdownDiv.querySelectorAll('a');
                aLinks.forEach(link => {
                    link.addEventListener('click', popupForm.showGenreAddToInputTxTitle);
                });

                dropdownDiv.style.display = 'block';
            } else {
                dropdownDiv.style.display = 'none';

                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }
            }
        });
    },

    showGenreAddToInputTxTitle: function (evt) {
        let titleSet = evt.currentTarget.dataset;
        let dropdownDiv = document.getElementById('form-show-genre-dropdown');
        let inputTxTitle = document.getElementById('form-show-genre-show-id');

        inputTxTitle.value = titleSet.showTitle;
        inputTxTitle.setAttribute("data-show-id", titleSet.showId);
        inputTxTitle.setAttribute("data-show-title", titleSet.showTitle);
        dropdownDiv.style.display = 'none';

        let linksTmp = document.querySelectorAll("#form-show-genre-dropdown > a");
        if (linksTmp !== null) {
            linksTmp.forEach(element => {
                element.remove();
            });
        }

        let searchInput = document.querySelector("#form-show-genre-show-search");
        searchInput.value = "";

        popupForm.simulateInputEvent(inputTxTitle);
    },

    fillShowGenreSelect: function () {
        let seasonsSelect = document.querySelector('#form-show-genre-genre-name');
        let seasonOption = document.querySelectorAll('#form-show-genre-genre-name > option');

        seasonOption.forEach(option => {
            option.remove()
        });

        dataHandler.getGenresName(function (genresData) {
            genresData.forEach(genre => {
                let option = `<option value="${genre.id}">${genre.name}</option>`
                seasonsSelect.insertAdjacentHTML('beforeend', option);
            });
        });
    },

    showGenreOnSubmit: function () {
        let showGenreData = {
            "show_id": document.getElementById('form-show-genre-show-id').dataset.showId,
            "genre_id": document.getElementById('form-show-genre-genre-name').value
        }

        dataHandler.addShowGenre(showGenreData, function (confirmation) {
            if (confirmation['is_show_genre_add'] === 'YES') {
                popupForm.removeFromShowGenre();

                popupForm.addOutput('The genre has been added to the show.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromShowGenre();

                popupForm.addOutput('The genre has not been added to the show.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },

    removeFromShowGenre: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD GENRE TO SHOW FORM ============================================= */


    /** === BEGIN = ADD ACTOR TO SHOW FORM =========================================== */
    addShowCharListeners: function () {
        let inputTxTitle = document.querySelector('#form-show-char-show-id');
        let inputTxSearch = document.querySelector('#form-show-char-show-search');

        let inputTxTitleActor = document.querySelector('#form-show-char-actor-id');
        let inputTxSearchActor = document.querySelector('#form-show-char-actor-search')

        let submitBtn = document.querySelector('#form-show-char-submit');

        inputTxTitle.addEventListener('click', popupForm.showCharOnClickInputTx);
        inputTxSearch.addEventListener('input', popupForm.showCharOnChangeInputTx);

        inputTxTitleActor.addEventListener('click', popupForm.showCharOnClickInputTxActor);
        inputTxSearchActor.addEventListener('input', popupForm.showCharOnChangeInputTxActor);

        submitBtn.addEventListener('click', popupForm.showCharOnSubmit);
    },

    showCharOnClickInputTx: function () {
        let dropdownDiv = document.getElementById('form-show-char-show-dropdown');

        dropdownDiv.style.display = 'block';
    },

    showCharOnClickInputTxActor: function () {
        let dropdownDiv = document.getElementById('form-show-char-actor-dropdown');

        dropdownDiv.style.display = 'block';
    },

    showCharOnChangeInputTx: function (evt) {
        let dropdownDiv = document.getElementById('form-show-char-show-dropdown');
        let txt = evt.currentTarget.value;

        let data = {
            "phrase": txt
        }
        dataHandler.searchShowTitle(data, function (showTitle) {
            let linksTmp = document.querySelectorAll("#form-show-char-show-dropdown > a");
            if (txt.length > 0) {
                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }

                for (let title of showTitle) {

                    let link = `<a href="javascript:void(0)" data-show-id="${title.id}" data-show-title="${title.title}">${title['title']}</a>\n`;
                    dropdownDiv.insertAdjacentHTML('beforeend', link);
                }

                let aLinks = dropdownDiv.querySelectorAll('a');
                aLinks.forEach(link => {
                    link.addEventListener('click', popupForm.showCharAddToInputTxTitle);
                });

                dropdownDiv.style.display = 'block';
            } else {
                dropdownDiv.style.display = 'none';

                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }
            }
        });
    },

    showCharOnChangeInputTxActor: function (evt) {
        let dropdownDiv = document.getElementById('form-show-char-actor-dropdown');
        let txt = evt.currentTarget.value;

        let data = {
            "phrase": txt
        }
        dataHandler.searchActorName(data, function (showName) {
            let linksTmp = document.querySelectorAll("#form-show-char-actor-dropdown > a");
            if (txt.length > 0) {
                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }

                for (let actor of showName) {

                    let link = `<a href="javascript:void(0)" data-actor-id="${actor.id}" data-actor-name="${actor.name}">${actor.name}</a>\n`;
                    dropdownDiv.insertAdjacentHTML('beforeend', link);
                }

                let aLinks = dropdownDiv.querySelectorAll('a');
                aLinks.forEach(link => {
                    link.addEventListener('click', popupForm.showCharAddToInputTxTitleActor);
                });

                dropdownDiv.style.display = 'block';
            } else {
                dropdownDiv.style.display = 'none';

                if (linksTmp !== null) {
                    linksTmp.forEach(element => {
                        element.remove();
                    });
                }
            }
        });
    },

    showCharAddToInputTxTitle: function (evt) {
        let titleSet = evt.currentTarget.dataset;
        let dropdownDiv = document.getElementById('form-show-char-show-dropdown');
        let inputTxTitle = document.getElementById('form-show-char-show-id');

        inputTxTitle.value = titleSet.showTitle;
        inputTxTitle.setAttribute("data-show-id", titleSet.showId);
        inputTxTitle.setAttribute("data-show-title", titleSet.showTitle);
        dropdownDiv.style.display = 'none';

        let linksTmp = document.querySelectorAll("#form-show-char-show-dropdown > a");
        if (linksTmp !== null) {
            linksTmp.forEach(element => {
                element.remove();
            });
        }

        let searchInput = document.querySelector("#form-show-char-show-search");
        searchInput.value = "";

        popupForm.simulateInputEvent(inputTxTitle);
    },

    showCharAddToInputTxTitleActor: function (evt) {
        let nameSet = evt.currentTarget.dataset;
        let dropdownDiv = document.getElementById('form-show-char-actor-dropdown');
        let inputTxTitle = document.getElementById('form-show-char-actor-id');

        inputTxTitle.value = nameSet.actorName;
        inputTxTitle.setAttribute("data-actor-id", nameSet.actorId);
        inputTxTitle.setAttribute("data-actor-name", nameSet.actorName);
        dropdownDiv.style.display = 'none';

        let linksTmp = document.querySelectorAll("#form-show-char-actor-dropdown > a");
        if (linksTmp !== null) {
            linksTmp.forEach(element => {
                element.remove();
            });
        }

        let searchInput = document.querySelector("#form-show-char-actor-search");
        searchInput.value = "";

        popupForm.simulateInputEvent(inputTxTitle);
    },

    showCharOnSubmit: function () {
        let showGenreData = {
            "show_id": document.getElementById('form-show-char-show-id').dataset.showId,
            "actor_id": document.getElementById('form-show-char-actor-id').dataset.actorId,
            "character_name": document.getElementById('form-show-char-name').value

        };

        dataHandler.addShowChar(showGenreData, function (confirmation) {
            if (confirmation['is_show_char_add'] === 'YES') {
                popupForm.removeFromShowChar();

                popupForm.addOutput('The actor has been added to the show.');
                setTimeout(popupForm.removeOutput, 1500);
            } else {
                popupForm.removeFromShowChar();

                popupForm.addOutput('The actor has not been added to the show.', false);
                setTimeout(popupForm.removeOutput, 1500);
            }
        });
    },

    removeFromShowChar: function () {
        let popup = document.getElementById('popup-form-main');
        popup.style.display = 'none';
        popup.remove();
    },
    /** === END = ADD ACTOR TO SHOW FORM ============================================= */
}
