import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user:{
      data:{},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: {
      loading: false,
      links: [],
      data: [
        {
          id: 100,
          title: "ThenCodeHolic Youtube channel content"
        }
      ]
    },
  },
  getters: {},
  actions: {
    register({commit}, user){
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    login({commit}, user){
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    logout({commit}){
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout');
          return response;
        })
    },
  },
  mutations: {
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem('TOKEN');
    }
  },
  modules: {},
});

export default store; 