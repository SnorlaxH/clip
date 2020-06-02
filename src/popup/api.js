import qs from 'qs'
const manifest = chrome.runtime.getManifest()
const axios = require('axios')
var token = ''
chrome.storage.local.get(
    ['access_token'],
    data => {
        token = data.access_token
    }
);

const URL = {
    USERS: 'https://api.twitch.tv/helix/users',
    CLIPS: 'https://api.twitch.tv/helix/clips',
}

export const api = {
    getUsers: (data) => {
        return axios({
            method: 'get',
            headers: {
                'Client-ID': manifest.token,
                'Authorization': 'Bearer ' + token
            },
            url: URL.USERS + '?' + qs.stringify(data),
        })
    },
    getList: (data) => {
        return axios({
            method: 'get',
            headers: {
                'Client-ID': manifest.token,
                'Authorization': 'Bearer ' + token
            },
            url: URL.CLIPS + '?' + qs.stringify(data),
        })
    }
}