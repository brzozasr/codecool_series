import {dataHandler} from "./data_handler.js";

export let login = {
    loginForm: `
    <div id="login-main">
        <div id="login-log">
            <form id="login-form-log" name="login-form-log" class="login-form">
                <img id="login-close" src="/static/assets/close.png" alt="X">
                <h2 class="login-h2">Login Form</h2>
                <hr class="login-hr">
                <div class="login-div-img">
                    <img class="login-img" src="/static/assets/email.png" alt="">
                    <input type="email" id="login-email" name="login-email" placeholder="Email" autocomplete="on" minlength="5" required>
                </div>
                <div class="login-div-img">
                    <img class="login-img" src="/static/assets/password.png" alt="">
                    <input type="password" id="login-password" name="login-password" class="login-pass" placeholder="Password" autocomplete="current-password" minlength="8" required>
                </div>
                <a id="login-submit">Login</a>
                <div id="login-error" ></div>
            </form>
        </div>
    </div>
    `,

    registerForm: `
    <div id="login-main">
        <div id="login-log">
            <form id="login-form-reg" name="login-form-reg" class="login-form">
                <img id="login-close" src="/static/assets/close.png" alt="X">
                <h2 class="login-h2">Register Form</h2>
                <hr class="login-hr">
                <div class="login-div-img">
                    <img class="login-img" src="/static/assets/email.png" alt="">
                    <input type="email" id="login-email" name="login-email" placeholder="Email" autocomplete="on" minlength="5" required>
                </div>
                <div class="login-div-img">
                    <img class="login-img" src="/static/assets/password.png" alt="">
                    <input type="password" id="login-password-1" name="login-password-1" class="login-pass" placeholder="Password" autocomplete="current-password" minlength="8" required>
                </div>
                <div class="login-div-img">
                    <img class="login-img" src="/static/assets/password.png" alt="">
                    <input type="password" id="login-password-2" name="login-password-2" class="login-pass" placeholder="Confirm Password" autocomplete="current-password" minlength="8" required>
                </div>
                <a id="login-submit">Register</a>
                <div id="login-error" ></div>
            </form>
        </div>
    </div>
    `,

    divTopBar: document.getElementById('body-wrapper'),

    loginButton: document.getElementById('bt-login'),

    registerButton: document.getElementById('bt-register'),

    logoutButton: document.getElementById('bt-logout'),

    userLoginButton: document.getElementById('bt-user-log'),

    addButton: document.getElementById('menu-btn-add'),

    // Checkin that the user is login
    verificationIsUserLogin: function () {
        login.jsIsUserLogin(sessionStorage.getItem('users_login'));
    },

    //Function To Display Popup Login
    divLoginShow: function () {
        login.divTopBar.insertAdjacentHTML('beforebegin', login.loginForm);
        document.getElementById('login-main').style.display = "block";
        login.closeSubmitAddListener();
    },

    //Function To Display Popup Register
    divRegisterShow: function () {
        login.divTopBar.insertAdjacentHTML('beforebegin', login.registerForm);
        document.getElementById('login-main').style.display = "block";
        login.closeSubmitAddListener();
    },

    // Function adds the event listener to the submit button and the close cross image.
    closeSubmitAddListener: function () {
        let closeImg = document.getElementById('login-close');
        closeImg.addEventListener('click', login.removeForm);

        let submitButton = document.getElementById('login-submit');
        submitButton.addEventListener('click', login.submitForm);
    },

    //Function to Remove Popup
    removeForm: function () {
        let loginForm = document.getElementById('login-main');
        loginForm.style.display = "none";
        loginForm.remove();
    },

    // Function to Submit Form depends on form ID
    submitForm: function () {
        let divForm = document.getElementById('login-main');
        let formId = divForm.getElementsByTagName('form')[0].id;

        if (formId === 'login-form-log') {
            let emailValue = document.getElementById('login-email').value;
            let emailCorrect = login.validateEmail(emailValue);

            let passValue = document.getElementById('login-password').value;
            let passCorrect = false

            if (emailCorrect === true) {
                passCorrect = login.validatePassword(passValue);
            }

            if (emailCorrect === true && passCorrect === true) {
                let dataLogForm = {
                    users_login: emailValue,
                    users_pass: passValue
                };
                dataHandler.loginUser(dataLogForm, function (dataLogForm) {
                    if (dataLogForm['login'] === 'Success') {
                        login.jsSetSession(dataLogForm['users_id'], dataLogForm['users_login']);
                        login.removeForm();
                        login.jsIsUserLogin(dataLogForm['users_login']);
                    } else {
                        let divError = document.getElementById('login-error');
                        divError.innerText = dataLogForm['error'];
                        divError.style.display = 'block';
                    }
                });
            }
        } else if (formId === 'login-form-reg') {
            let emailValue = document.getElementById('login-email').value;
            let emailCorrect = login.validateEmail(emailValue);

            let pass1Value = document.getElementById('login-password-1').value;
            let pass1Correct = false

            let pass2Value = document.getElementById('login-password-2').value;
            let pass2Correct = false

            if (emailCorrect === true) {
                pass1Correct = login.validatePassword(pass1Value);
            }

            if (emailCorrect === true && pass1Correct === true) {
                pass2Correct = login.validatePassword(pass1Value, pass2Value);
            }

            if (emailCorrect === true && pass1Correct === true && pass2Correct === true) {
                let dataRegForm = {
                    users_login: emailValue,
                    users_pass: pass1Value
                };
                dataHandler.registerUser(dataRegForm, function (dataRegForm) {
                    if (dataRegForm['register'] === 'Success') {
                        login.removeForm();
                    } else {
                        let divError = document.getElementById('login-error');
                        divError.innerText = dataRegForm['error'];
                        divError.style.display = 'block';
                    }
                });
            }
        }
    },

    // Validating Form Field Email
    validateEmail: function (email) {
        let divForm = document.getElementById('login-main');
        let formId = divForm.getElementsByTagName('form')[0].id;

        let divError = document.getElementById('login-error');

        if (formId === 'login-form-reg') {
            if (email === "") {
                divError.innerText = 'The field "Email" cannot be empty!';
                divError.style.display = 'block';
                return false;
            } else if (email.length < 6) {
                divError.innerText = 'The "Email" field must contain at least 6 characters!';
                divError.style.display = 'block';
                return false;
            } else {
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let regexCorrect = re.test(email);

                if (regexCorrect === true) {
                    divError.innerText = '';
                    divError.style.display = 'none';
                    return true;
                } else {
                    divError.innerText = 'The "Email" must contain the at "@" and the dot "."!';
                    divError.style.display = 'block';
                    return false;
                }
            }
        } else if (formId === 'login-form-log') {
            if (email === "") {
                divError.innerText = 'The field "Email" cannot be empty!';
                divError.style.display = 'block';
                return false;
            } else {
                divError.innerText = '';
                divError.style.display = 'none';
                return true;
            }
        }
    },

    // Validating Form Field Password
    validatePassword: function (password1, password2 = null) {
        let divForm = document.getElementById('login-main');
        let formId = divForm.getElementsByTagName('form')[0].id;

        let divError = document.getElementById('login-error');

        if (formId === 'login-form-reg') {
            if (password1 === "") {
                divError.innerText = 'The field "Password" cannot be empty!';
                divError.style.display = 'block';
                return false;
            } else if (password1.length < 8) {
                divError.innerText = 'The "Password" field must contain at least 8 characters!';
                divError.style.display = 'block';
                return false;
            } else if (password2 !== null && password1 !== password2) {
                divError.innerText = 'The field "Passwords" must match.!';
                divError.style.display = 'block';
                return false;
            } else {
                divError.innerText = '';
                divError.style.display = 'none';
                return true;
            }
        } else if (formId === 'login-form-log') {
            if (password1 === "") {
                divError.innerText = 'The field "Password" cannot be empty!';
                divError.style.display = 'block';
                return false;
            } else {
                divError.innerText = '';
                divError.style.display = 'none';
                return true;
            }
        }
    },

    jsSetSession: function (users_id, users_login) {
        sessionStorage.clear();
        sessionStorage.setItem('users_id', users_id);
        sessionStorage.setItem('users_login', users_login);
    },

    jsIsUserLogin: function (userName) {
        let dataLogin = {
            users_id: sessionStorage.getItem('users_id'),
            users_login: sessionStorage.getItem('users_login')
        };
        dataHandler.isUserLogin(dataLogin, function (dataLogin) {
            if (dataLogin['is_login'] === true) {
                login.topBarBtnAppearance(true, userName);

                let currentUrl = window.location.pathname;
                if (currentUrl === '/user-not-login/') {
                    let text = document.querySelector('div.info');
                    console.log(text)
                    text.style.color = '#0052cc';
                    text.innerHTML = 'Now, you are logged in.';
                    setTimeout(login.goToUrl, 2000);
                }

            } else {
                login.topBarBtnAppearance(false, '');
            }
        });
    },

    goToUrl: function () {
        window.location.href = '/';
    },

    topBarBtnAppearance: function (isLogin, userName) {
        let currentUrl = window.location.pathname;

        if (isLogin) {
            login.loginButton.style.display = 'none';
            login.registerButton.style.display = 'none';
            login.userLoginButton.innerText = userName;
            login.userLoginButton.style.display = 'inline-block';
            login.logoutButton.style.display = 'inline-block';

            if (currentUrl === '/add/') {
                login.addButton.style.display = 'none';
            } else {
                login.addButton.style.display = 'inline-block';
            }
        } else {
            login.loginButton.style.display = 'inline-block';
            login.registerButton.style.display = 'inline-block';
            login.userLoginButton.innerText = '';
            login.userLoginButton.style.display = 'none';
            login.logoutButton.style.display = 'none';
            login.addButton.style.display = 'none';
        }
    },

    logoutUser: function () {
        let dataLogout = {
            command: 'LOGOUT'
        };
        dataHandler.userLogout(dataLogout, function (dataLogout) {
            if (dataLogout['logout'] === 'Success') {
                login.topBarBtnAppearance(false, '');
                sessionStorage.clear();
            } else {
                login.topBarBtnAppearance(true, sessionStorage.getItem('users_login'));
            }
        });
    },
};