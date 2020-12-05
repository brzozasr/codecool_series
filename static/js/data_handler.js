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

    _api_postOnly: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
            callback(response);
            console.log(response);
        });
    },

    registerUser: function (userData, callback) {
        this._api_post(`/user-register`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    isUserLogin: function (isLogin, callback) {
        this._api_post(`/is-user-login`, isLogin, (response) => {
            callback(response);
            console.log(response);
        });
    },

    userLogout: function (userData, callback) {
        this._api_post(`/user-logout`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    checkShowTitle: function (userData, callback) {
        this._api_post(`/check-show-title/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    checkActorName: function (userData, callback) {
        this._api_post(`/check-actor-name/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    checkGenreName: function (userData, callback) {
        this._api_post(`/check-genre-name/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    searchShowTitle: function (userData, callback) {
        this._api_post(`/get-show-title/`, userData, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    searchActorName: function (userData, callback) {
        this._api_post(`/get-actors-name/`, userData, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    addShow: function (userData, callback) {
        this._api_post(`/add-show/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    addActor: function (userData, callback) {
        this._api_post(`/add-actor/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    addGenre: function (userData, callback) {
        this._api_post(`/add-genre/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    addSeason: function (userData, callback) {
        this._api_post(`/add-season/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    addEpisode: function (userData, callback) {
        this._api_post(`/add-episode/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    addShowGenre: function (userData, callback) {
        this._api_post(`/add-show-genre/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    addShowChar: function (userData, callback) {
        this._api_post(`/add-show-actor/`, userData, (response) => {
            callback(response);
            console.log(response);
        });
    },

    seasonTitleByShowId: function (userData, callback) {
        this._api_post(`/get-seasons-title/by/show_id/`, userData, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    getGenresName: function (callback) {
        this._api_postOnly(`/get-genres-name/`, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    getShowsPaging: function (userData, callback) {
        this._api_post(`/get/shows/title/all/`, userData, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    getActorsAll: function (callback) {
        this._api_postOnly(`/get/actors/name/all/`, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    getActorsGenres: function (callback) {
        this._api_postOnly(`/get/actors/with/genres/`, (response) => {
            callback(response);
            // console.log(response);
        });
    },

    actorsCharactersByShowId: function (userData, callback) {
        this._api_post(`/actors/with/characters/by/show/`, userData, (response) => {
            callback(response);
            // console.log(response);
        });
    },
};
