import Vue from 'vue'
import Vuex from 'vuex'
import { Constant } from './constant'
import { api } from './api';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        mode: 0,
        user: {},
        list: []
    },
    getters: {
        getMode(state) {
            return state.mode;
        },
        getList(state) {
            return state.list;
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        [Constant.GET_CLIPS]: (state, { data }) => {

        },
        [Constant.CHANGE_MODE]: (state, { data }) => {
            state.mode = data;
        },
        [Constant.GET_USER]: (state, { data }) => {
            state.user = data;
        },
        [Constant.CLEAR_USER]: (state) => {
            state.user = {};
        }
    },
    actions: {
        [Constant.GET_USER]: ({ state, commit }, { data }) => {
            api.getUsers({ login: data }).then((r) => {
                if (r.data.data.length > 0) {
                    commit(Constant.GET_USER, { data: r.data.data[0] })
                } else {
                    M.toast({
                        html: '스트리머의 영문 채널명을 입력하세요.',
                        classes: 'rounded'
                    })
                }
            }, (r) => {
                M.toast({
                    html: '스트리머의 영문 채널명을 입력하세요.',
                    classes: 'rounded'
                })
            })
        },
        [Constant.GET_CLIPS]: ({ state, commit }, { data }) => {
            api.getList(data).then((r) => {

            })
        },
    }
})