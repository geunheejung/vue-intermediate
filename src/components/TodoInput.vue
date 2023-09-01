<template>
  <div>
    <input type="text" v-model="newTodoItem" />
    <button v-on:click="addTodo">add</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      newTodoItem: "",
    };
  },
  methods: {
    addTodo: function () {
      /**
       * this는 현재 실행 컨텍스트의 상위 컨텍스트
       * 모든 컴포넌트들이 App.vue에 등록 -> App.vue는 main.js -> Vue 인스턴스 하나에 모두 등록됨.
       * this를 거슬러올라가면 똑같은 인스턴스를 가리킴.
       */
      const { newTodoItem } = this;
      localStorage.setItem(newTodoItem, newTodoItem);
      this.newTodoItem = "";
    },
  },
};
</script>

<style></style>
