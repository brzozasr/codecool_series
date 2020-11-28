import {actBtn} from "./active-buttons.js";
import {login} from "./login.js";

(function () {
    function init() {
        actBtn.addBtnListeners();
        login.verificationIsUserLogin();
    }

    init();
})();