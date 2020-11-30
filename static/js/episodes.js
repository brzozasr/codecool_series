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


    resizeIframe: function () {
        let w = document.documentElement.clientWidth || window.innerWidth;
        let h = document.documentElement.clientHeight || window.innerHeight;
        let iframe = document.getElementById('episodes-iframe');
        let iframeLeftCss = iframe.offsetLeft;  // width
        let iframeTopCss = iframe.offsetTop;  // height
        let iframeWidth = w - (iframeLeftCss) * 2;
        let iframeHeight = h - (iframeTopCss) * 2;

        iframe.style.width = '0';
        iframe.style.width = iframeWidth.toString() + 'px';
        iframe.style.height = '0';
        iframe.style.height = iframeHeight.toString() + 'px';
    },

    iframeLinksAddListeners: function () {
        console.log(`length: ${episodes.episodeLinks.length}`)
        if (episodes.episodeLinks.length > 0) {
            episodes.episodeLinks.forEach(link => {
                link.addEventListener('click', episodes.openEpisodes);
            });
        }
    },

    openEpisodes: function (evt) {
        let seasId = evt.currentTarget.dataset.seasonId;
        episodes.divTopBar.insertAdjacentHTML('beforebegin', episodes.episodesMain(`/episodes/${seasId}/`));
        let episodesDiv = document.getElementById('episodes-main');
        episodesDiv.style.display = 'block';

        let closeImage = document.getElementById('episodes-close');
        closeImage.addEventListener('click', episodes.closeEpisodes);

        episodes.resizeIframe();
        // setTimeout(episodes.resizeIframe, 100);
    },

    closeEpisodes: function () {
        let episodesDiv = document.getElementById('episodes-main');
        episodesDiv.style.display = 'none';
        episodesDiv.remove();
    },
};

// console.log(window.innerWidth);  // inner window size with 'width' scroll
// console.log(document.documentElement.clientWidth)  // inner window size 'width' without scroll
// console.log(document.body.clientWidth)  // body tag size 'width', it could by bigger then window size
// console.log(window.innerHeight)  // inner window size 'height' with scroll
// console.log(document.documentElement.clientHeight)  // inner window size 'height' without scroll
// console.log(document.body.clientHeight) // body tag size 'height', it could by bigger then window size