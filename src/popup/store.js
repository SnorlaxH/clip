import Vue from 'vue'
import Vuex from 'vuex'
import { Constant } from './constant'
import { api } from './api';

Vue.use(Vuex)

const plugin = store => {
    store.subscribe((mutation, state) => {
        chrome.storage.largeSync.set({
            mode: state.mode,
            user: state.user,
            list: state.list,
            bookmark: state.bookmark,
            cursor: state.cursor,
        }, () => {
            console.log('save all states');
        })
    })
}

export const store = new Vuex.Store({
    state: {
        mode: 0,
        user: {},
        list: [],
        bookmark: [],
        cursor: '',
        version: chrome.runtime.getManifest().version,
    },
    getters: {
        getMode(state) {
            return state.mode;
        },
        getList(state) {
            return state.list;
        },
        getBookmark(state) {
            return state.bookmark;
        },
        getUser(state) {
            return state.user;
        },
        getVersion(state) {
            return state.version;
        }
    },
    mutations: {
        [Constant.INIT_DATA](state, { data }) {
            Object.assign(state, data);
        },
        [Constant.GET_CLIPS](state, { data }) {
            state.list = state.list.concat(data);
        },
        [Constant.CHANGE_MODE](state, { data }) {
            state.mode = data
        },
        [Constant.GET_USER](state, { data }) {
            state.user = data
        },
        [Constant.CLEAR_USER](state) {
            state.user = {}
            state.list.splice(0, state.list.length)
        },
        [Constant.SET_CURSOR](state, { cursor }) {
            state.cursor = cursor
        },
        [Constant.ADD_BOOKMARK](state, { data }) {
            state.bookmark.push(data);
        },
        [Constant.DEL_BOOKMARK](state, { data }) {
            let idx = 0;
            state.bookmark.filter(item => {
                if (item.id === data.id) {
                    state.bookmark.splice(idx, 1);
                }
                idx++;
            });
        }
    },
    actions: {
        [Constant.GET_USER]({ state, commit, dispatch }, { data, init }) {
            api.getUsers({ login: data }).then((r) => {
                if (r.data.data.length > 0) {
                    commit(Constant.GET_USER, { data: r.data.data[0] });
                    if (init) {
                        const obj = {}
                        state.list.splice(0, state.list.length);
                        dispatch(Constant.GET_CLIPS, { data: obj })
                    }
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
        [Constant.GET_CLIPS]({ state, commit }, { data }) {
            api.getList({
                broadcaster_id: state.user.id,
                first: 100,
                data
            }).then((r) => {
                if (r.data.data.length > 0) {
                    const arr = [];
                    r.data.data.forEach(item => {
                        item.broadcaster_login = state.user.login;
                        arr.push(item)
                    });
                    commit(Constant.GET_CLIPS, { data: arr })
                }
                commit(Constant.SET_CURSOR, { cursor: r.data.pagination.hasOwnProperty('cursor') ? r.data.pagination.cursor : '' });
            })
        },
    },
    plugins: [plugin]
})