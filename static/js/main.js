import {actBtn} from "./active-buttons.js";
import {login} from "./login.js";
import {popup} from "./popup.js";
import {episodes} from "./episodes.js";
import {popupForm} from "./popup_form.js";

(function () {
    function init() {
        actBtn.addBtnListeners();
        login.verificationIsUserLogin();
        popup.popupLinksAddListeners();
        window.addEventListener('resize', episodes.resizeIframe);
        popupForm.formLinksEventListener();
    }

    init();
})();