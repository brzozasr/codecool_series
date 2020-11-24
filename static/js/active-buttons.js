export let actBtn = {

    buttons: document.querySelectorAll("button"),


    addBtnListeners: function () {
        /** Here add new <button> on the page.
         * Place in the object {key: function}:
         * - key: unique ID of the button,
         * - function: the function which will run after clicking.
         */
        let objButtons = [
            {"bt-register": actBtn.registerBtn},
            {"bt-login": actBtn.loginBtn},
            {"menu-btn-back": actBtn.goToHomeBtn},
            {"menu-btn-shows": actBtn.goToShowsBtn}
        ];

        let i = 0;
        for (let btn of actBtn.buttons) {
            for (let j = 0; j < objButtons.length; j++) {
                if (Object.keys(objButtons[j])[0] === btn.id) {
                    btn.addEventListener('click', objButtons[j][Object.keys(objButtons[j])[0]]);
                }
            }
            i++;
        }
    },

    loginBtn: function () {
        console.log('login')
    },

    registerBtn: function () {
        console.log('register')
    },

    goToShowsBtn: function () {
        window.location.href = "/shows/most-rated";
    },

    goToHomeBtn: function () {
        window.location.href = "/";
    },
}