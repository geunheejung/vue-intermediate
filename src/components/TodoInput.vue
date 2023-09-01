<template>
  <div class="input-box shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="add-container" v-on:click="addTodo">
      <i class="fa-solid fa-plus add-btn"></i>
    </span>
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
      this.clearInput();
    },
    clearInput: function () {
      this.newTodoItem = "";
    },
  },
};
</script>

<style>
.input-box input:focus {
  outline: none;
}

.input-box {
  display: inline-flex;

  justify-content: center;
  height: 50px;
}

.input-box input {
  border-style: none;
  border-radius: 5px 0 0 5px;
  font-size: 0.9rem;
}

.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 3rem;
  background: linear-gradient(to right, #6478fb, #8763fb);
  border-radius: 0 5px 5px 0;
}

.add-btn {
  color: #fff;
}
</style>
