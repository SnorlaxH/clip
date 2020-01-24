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