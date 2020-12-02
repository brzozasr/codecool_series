export let popupForm = {

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
        <p>A form example to edit a TV show's episode:</p>
            <form action="#" method="post">
                <p class="form-element">
                    <label class="form-element-label" for="form-example-show">Show:</label>
                    <select name="show" id="form-example-show">
                        <option value="">Game of Thrones (2011)</option>
                        <option value="">Lost (2004)</option>
                        <option value="">South Park (1997)</option>
                        <option value="">How I met your mother (2005)</option>
                        <option value="">Legion (2017)</option>
                    </select>
                </p>
                <p class="form-element">
                    <label class="form-element-label" for="form-example-season">Season:</label>
                    <input type="number" name="season" id="form-example-season" value="" min="1" max="30">
                </p>
                <p class="form-element">
                    <label class="form-element-label" for="form-example-episode">Episode:</label>
                    <input type="number" name="episode" id="form-example-episode" value="" min="1" max="100">
                </p>
                <p class="form-element">
                    <label class="form-element-label" for="form-example-title">Title:</label>
                    <input type="text" name="name" id="form-example-title" value="" placeholder="What the pencake?">
                </p>
                <p class="form-element">
                    <label class="form-element-label" for="form-example-length">Length:</label>
                    <input type="number" name="length" id="form-example-length" value="" min="1" max="999">
                    <span>min.</span>
                </p>
                <p class="text-center">
                    <button type="submit">Submit</button>
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
                console.log('form-in')
                break;
            case 'form-actors':
                formHtml = popupForm.formShows;
                console.log('Apples are $0.32 a pound.');
                break;
            case 'form-genres':
                formHtml = popupForm.formShows;
                console.log('Bananas are $0.48 a pound.');
                break;
            case 'form-seasons':
                formHtml = popupForm.formShows;
                console.log('Cherries are $3.00 a pound.');
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

        popupForm.divTopBar.insertAdjacentHTML('beforebegin', popupForm.popupFormMain(formHtml));
        let popupFormDiv = document.getElementById('popup-form-main');
        popupFormDiv.style.display = 'block';

        let closeImage = document.getElementById('popup-form-close');
        closeImage.addEventListener('click', popupForm.closePopupForm);
    },

    closePopupForm: function () {
        let popupFormDiv = document.getElementById('popup-form-main');
        popupFormDiv.style.display = 'none';
        popupFormDiv.remove();
    },
}
