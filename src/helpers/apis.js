import $ from 'jquery';
import config from '../config.js'
const axios = require('axios');
const qs = require('qs');

export const postLoginUrl = config.apiUrl + '/login'
export const getSpotUrl = config.apiUrl + '/spot'
export const getSpotInfoUrl = config.apiUrl + '/spot/'
export const postNewSpotUrl = config.apiUrl + '/spot'
export const getFavoritesUrl = config.apiUrl + '/favourites'
export const deleteSpotUrl = config.apiUrl + '/spot/'
export const postFavoriteSpotUrl = config.apiUrl + '/favourites'
export const deleteFavoriteUrl = config.apiUrl + '/favourites/'

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
        success();
    }, (error) => {
        console.log(error);
        // failure(error);
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