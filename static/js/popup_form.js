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
                <label class="form-element-label" for="form-show-title">Title:</label>
                <input name="form-show-title" id="form-show-title" value="" placeholder="Title of show" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-year">Release date:</label>
                <input type="date" name="season" id="form-show-year" value="" required>
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-runtime">Length:</label>
                <input type="number" name="form-show-runtime" id="form-show-runtime" value="1" min="0" max="999" required>
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
                <input name="form-show-trailer" id="form-show-trailer" value="" placeholder="Link to the trailer">
            </p>
            <p class="form-element">
                <label class="form-element-label" for="form-show-homepage">Homepage:</label>
                <input name="form-show-homepage" id="form-show-homepage" value="" placeholder="Link to the homepage">
            </p>
            <p class="text-center">
                <button type="button" id="form-actor-add">Submit</button>
            </p>
        </form>
    `,

    formSeasons: `
        <p class="text-center">ADD SEASON:</p>
        <form action="#" method="post" autocomplete="off" id="form-season">
            <div class="form-element">
                <label class="form-element-label" for="form-season-show-id">Title of show:</label>
                <div class="form-div-element">
                    <input type="text" name="form-season-show-id" id="form-season-show-id" value="" placeholder="Click to search a title" readonly required>
                    <div class="form-div-dropdown" id="form-season-dropdown">
                        <input type="text" placeholder="Search..." id="form-season-search">
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
                console.log('Apples are $0.32 a pound.');
                break;
            case 'form-genres':
                formHtml = popupForm.formShows;
                console.log('Bananas are $0.48 a pound.');
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
                formHtml = popupForm.formShows;
                console.log('ble-ble are $3.00 a pound.');
                break;
            case 'form-genre-show':
                formHtml = popupForm.formShows;
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            case 'form-actor-show':
                formHtml = popupForm.formShows;
                console.log('BBBBB and papayas are $2.79 a pound.');
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
                    break;
                } else {
                    popupForm.disableSubmitBtn(false, idSubmitBtn);
                }
            }
        });
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

    // === BEGIN = ADD SHOW FORM ==========================================
    addShowsListeners: function () {
        let inputTxTitle = document.querySelector('#form-show-title');
        let submitBtn = document.querySelector('#form-show-submit');

        inputTxTitle.addEventListener('input', popupForm.showsOnChangeInputTx);
        submitBtn.addEventListener('click', popupForm.showsOnSubmit)
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
    // === END = ADD SHOW FORM ==========================================


    // === BEGIN = ADD SEASON FORM ==========================================
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
                    link.addEventListener('click', popupForm.addToInputTxTitle);
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


    addToInputTxTitle: function (evt) {
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
    // === END = ADD SEASON FORM ==========================================
}
