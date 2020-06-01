import Vue from 'vue'
import ElementUI from 'element-ui'
import 'expose-loader?$!expose-loader?jQuery!jquery'

import App from './App'

import { store } from './store'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    render: h => h(App),
})

var access_token = '';

function getToken() {
    return new Promise(r => {
        new Promise((res, rej) => {
                chrome.storage.local.get('access_token', data => {
                    if (data.access_token) {
                        $.ajax({
                                method: 'GET',
                                url: 'https://id.twitch.tv/oauth2/validate',
                                headers: { 'Authorization': 'OAuth ' + data.access_token },
                                dataType: 'json'
                            })
                            .then(success => {
                                res([data.access_token, success])
                            }, rej)
                    } else {
                        rej()
                    }
                })
            })
            .then(async access_token => {
                window.auth_token = access_token[0]
                let login = access_token[1].login
            })
            .catch(() => {
                location.href = chrome.runtime.getURL('auth.html');
            })
            .finally(() => {
                r1();
            });
    })
}

getToken()