// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },

    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json_response => callback(json_response));
    },

    loginUser: function (userData, callback) {
        this._api_post(`/user-login`, userData, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            console.log(response);
        });
    },

    registerUser: function (userData, callback) {
        this._api_post(`/user-register`, userData, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            console.log(response);
        });
    },

    isUserLogin: function (isLogin, callback) {
        this._api_post(`/is-user-login`, isLogin, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            console.log(response);
        });
    },

    userLogout: function (userData, callback) {
        this._api_post(`/user-logout`, userData, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            console.log(response);
        });
    },

    checkShowTitle: function (userData, callback) {
        this._api_post(`/check-show-title/`, userData, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            console.log(response);
        });
    },

    searchShowTitle: function (userData, callback) {
        this._api_post(`/get-show-title/`, userData, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            // console.log(response);
        });
    },

    addShow: function (userData, callback) {
        this._api_post(`/add-show/`, userData, (response) => {
            // this._data[`allData`] = response;
            callback(response);
            console.log(response);
        });
    },
};
