import {actBtn} from "./active-buttons.js";
import {login} from "./login.js";
import {popup} from "./popup.js";

(function () {
    function init() {
        actBtn.addBtnListeners();
        login.verificationIsUserLogin();
        popup.popupLinksAddListeners();
    }

    init();
})();