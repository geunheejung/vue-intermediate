<template>
  <div class="input-box shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="add-container" v-on:click="addTodo">
      <i class="fa-solid fa-plus add-btn"></i>
    </span>
  </div>
</template>

<script>
const createTodoItem = (() => {
  let id = 0;
  return (content) => {
    return {
      id: id++,
      content,
      isCompleted: false,
    };
  };
})();

export default {
  // props: {
  //   addTodoItem: Function,
  // },
  data: function () {
    return {
      newTodoItem: "",
    };
  },
  methods: {
    addTodo: function () {
      const todoItem = createTodoItem(this.newTodoItem);
      localStorage.setItem(todoItem.id, JSON.stringify(todoItem));
      this.$emit("addTodoItem", todoItem);
      this.clearInput();
    },
    clearInput: function () {
      this.newTodoItem = "";
    },
  },
};
</script>

<style scoped>
.input-box input:focus {
  outline: none;
}

.input-box {
  display: flex;
  height: 50px;
}

.input-box input {
  flex-grow: 1;
  padding: 0 0.9rem;
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
