import {login} from "./login.js";

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
            {"bt-logout": actBtn.logoutBtn},
            {"menu-btn-back": actBtn.homepageBtn},
            {"menu-btn-shows": actBtn.showsBtn},
            {"menu-btn-actors": actBtn.actorsBtn},
            {"menu-btn-genres": actBtn.genresBtn},
            {"menu-btn-add": actBtn.addBtn}
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
        login.divLoginShow();
    },

    registerBtn: function () {
        login.divRegisterShow();
    },

    logoutBtn: function () {
        login.logoutUser();
    },

    showsBtn: function () {
        window.location.href = "/shows/most-rated/";
    },

    homepageBtn: function () {
        window.location.href = "/";
    },

    actorsBtn: function () {
        window.location.href = "/actors/";
    },

    genresBtn: function () {
        window.location.href = "/genres/";
    },

    addBtn: function () {
        window.location.href = "/add/";
    },
}