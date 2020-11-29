export let episodes = {

    episodesMain: function (url) {
        let codeHtml =
        `<div id="episodes-main">
            <img id="episodes-close" src="/static/assets/close.png" alt="X">
            <iframe src="${url}" id="episodes-iframe" name="episodes-iframe" title="Episodes"></iframe>
        </div>`;
        return codeHtml;
    },

    divTopBar: document.getElementById('body-wrapper'),

    episodeLinks: document.querySelectorAll('.episodes-link'),

    currentWindowsSize: function () {
        console.log(window.innerWidth);  // inner window size with scroll
        console.log(document.documentElement.clientWidth)  // inner window size without scroll
        console.log(document.body.clientWidth)  // body tag size
        console.log(window.innerHeight)
        console.log(document.documentElement.clientHeight)
        console.log(document.body.clientHeight)
    },

    popupLinksAddListeners: function () {
      episodes.popupLinks.forEach(link => {
          link.addEventListener('click', episodes.openPopup)
      });
    },

    openEpisodes: function () {
        // let actId = evt.currentTarget.dataset.actorId;
        // episodes.divTopBar.insertAdjacentHTML('beforebegin', episodes.episodesMain(`/actor/${actId}/`));
        episodes.divTopBar.insertAdjacentHTML('beforebegin', episodes.episodesMain(`eee`));
        let episodesDiv = document.getElementById('episodes-main');
        episodesDiv.style.display = 'block';

        let closeImage = document.getElementById('episodes-close');
        closeImage.addEventListener('click', episodes.closePopup);
    },
};