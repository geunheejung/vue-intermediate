<template>
  <div>
    <ul>
      <li v-for="todoItem in todoList" v-bind:key="todoItem" class="shadow">
        {{ todoItem }}
        <span class="remove-btn" @click="removeTodo(todoItem)">
          <i class="fa-solid fa-trash"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["todoList"],
  methods: {
    removeTodo: function (todoItem) {
      localStorage.removeItem(todoItem);
      this.$emit("removeTodoItem", todoItem);
    },
  },
  // 여기서 로컬 스토리지에 어떻게 접근해야 하지? 차라리 todoList를 props로 전달받고 상위에서 관리하게 하면?
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: #fff;
  border-radius: 5px;
}
.check-btn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.check-btn-completed {
  color: #b3adad;
}
.text-completed {
  text-decoration: line-through;
  color: #b3adad;
}

.remove-btn {
  cursor: pointer;
  color: #de4343;
}
</style>
