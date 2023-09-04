import Vue from "vue";
import { createStore } from "vuex";
import App from "../App.vue";

const store = createStore({
  state: {
    count: 0,
  },
  // 연산된 state 값을 접근하는 속성 computed 처럼 미리 연산된 값을 접근하는 속성
  getters: {
    increment(state) {
      return (state.count += 1);
    },
  },
  // state 값을 변경하는 이벤트 로직, 메서드 methods
  mutations: {
    setIncrement(state, value) {
      state.count += value;
    },
  },
});

export default store;
