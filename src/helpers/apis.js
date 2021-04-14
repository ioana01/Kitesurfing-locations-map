import $ from 'jquery';
import config from '../config.js'
const axios = require('axios');
const qs = require('qs');

export const postLoginUrl = config.apiUrl + '/login'
export const postRegisterUrl = config.apiUrl + '/user'
export const getUsersUrl = config.apiUrl + '/user'
export const deleteUserUrl = config.apiUrl + '/user/'
export const getUserDataUrl = config.apiUrl + '/user/'
export const updateUserUrl = config.apiUrl + '/user/'
export const getSpotUrl = config.apiUrl + '/spot'
export const getSpotInfoUrl = config.apiUrl + '/spot/'
export const postNewSpotUrl = config.apiUrl + '/spot'
export const deleteSpotUrl = config.apiUrl + '/spot/'
export const updateSpotUrl = config.apiUrl + '/spot/'
export const getFavoritesUrl = config.apiUrl + '/favourites'
export const postFavoriteSpotUrl = config.apiUrl + '/favourites'
export const deleteFavoriteUrl = config.apiUrl + '/favourites/'
export const getFavoriteDataUrl = config.apiUrl + '/favourites/'
export const updateFavoriteSpotUrl = config.apiUrl + '/favourites/'

export function postLogin(loginParams, success) {
    axios({
        method: 'post',
        url: postLoginUrl,
        data: qs.stringify(loginParams),
        headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        success(response);
    }, (error) => {
        console.log(error);
    });
}

export function postRegister(registerParams, success) {
    axios({
        method: 'post',
        url: postRegisterUrl,
        data: qs.stringify(registerParams),
        headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        success();
    }, (error) => {
        console.log(error);
    });
}

export function getUsers(setUsers) {
    axios({
        method: 'get',
        url:  getUsersUrl,
    }).then((response) => {
        setUsers(response.data);
    }, (error) => {
        console.log(error);
    })
}

export function getUserData(userId, showUserInfo) {

    axios({
        method: 'get',
        url:  getUserDataUrl + userId,
    }).then((response) => {
        showUserInfo(response);
    }, (error) => {
        console.log(error);
    })
}

export function deleteUser(userId, redirectToRegister) {
    axios({
        method: 'delete',
        url:  deleteUserUrl + userId,
    }).then((response) => {
        redirectToRegister();
    }, (error) => {
        console.log(error);
    })
}

export function updateUser(userId, newData) {
    axios({
        method: 'put',
        url: updateUserUrl + userId,
        data: qs.stringify(newData),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export function getSpotList(showPinPoints) {
    axios({
        method: 'get',
        url:  getSpotUrl,
    }).then((response) => {
        showPinPoints(response.data);
    }, (error) => {
        console.log(error);
    })
}

export function getSpotInfo(id, showPinInfo, map) {
    axios({
        method: 'get',
        url:  getSpotInfoUrl + id,
    }).then((response) => {
        showPinInfo(response, map);
    }, (error) => {
        console.log(error);
    })
}

export function postNewSpot(newData) {
    axios({
          method: 'post',
          url: postNewSpotUrl,
          data: qs.stringify(newData),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export function updateSpot(spotId, newData) {
    axios({
        method: 'put',
        url: updateSpotUrl + spotId,
        data: qs.stringify(newData),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export function getFavoritesList(showFavoriteSpots) {
    axios({
        method: 'get',
        url:  getFavoritesUrl,
    }).then((response) => {
        showFavoriteSpots(response.data);
    }, (error) => {
        console.log(error);
    })
}

export function getFavoriteData(favoriteId) {
    axios({
        method: 'get',
        url:  getFavoriteDataUrl + favoriteId,
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    })
}

export function deleteSpotRequest(deleteSpotId) {
    axios({
        method: 'delete',
        url:  deleteSpotUrl + deleteSpotId,
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    })
}

export function postFavoriteSpot(favoriteSpot) {
    axios({
        method: 'post',
        url: postFavoriteSpotUrl,
        data: qs.stringify(favoriteSpot),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export function updateFavoriteSpot(spotId, newData) {
    axios({
        method: 'put',
        url: updateFavoriteSpotUrl + spotId,
        data: qs.stringify(newData),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}

export function deleteFavoriteSpot(deleteFavoriteId) {
    axios({
        method: 'delete',
        url:  deleteFavoriteUrl + deleteFavoriteId,
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    })
}