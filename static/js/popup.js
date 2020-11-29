export let popup = {

    popupMain: function (url) {
        return `<div id="popup-main">
            <div id="popup-div-iframe">
                <img id="popup-close" src="/static/assets/close.png" alt="X">
                <iframe src="${url}" id="popup-iframe" name="popup-iframe" title="Actor's biography"></iframe>
            </div>
        </div>`;
    },

    divTopBar: document.getElementById('body-wrapper'),

    popupLinks: document.querySelectorAll('.popup-link'),

    popupLinksAddListeners: function () {
      popup.popupLinks.forEach(link => {
          link.addEventListener('click', popup.openPopup)
      });
    },

    openPopup: function (evt) {
        let actId = evt.currentTarget.dataset.actorId;
        popup.divTopBar.insertAdjacentHTML('beforebegin', popup.popupMain(`/actor/${actId}/`));
        let popupDiv = document.getElementById('popup-main');
        popupDiv.style.display = 'block';
        popupDiv.style.top = '0';

        let closeImage = document.getElementById('popup-close');
        closeImage.addEventListener('click', popup.closePopup);
    },

    closePopup: function () {
        let popupDiv = document.getElementById('popup-main');
        popupDiv.style.display = 'none';
    },
};