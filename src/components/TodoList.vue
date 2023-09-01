<template>
  <div>
    <ul>
      <li
        v-for="(todoItem, index) in todoList"
        v-bind:key="todoItem.content"
        @click="toggleTodo(todoItem, index)"
        v-bind:class="{ 'text-completed': todoItem.isCompleted }"
        class="shadow"
      >
        <span
          v-bind:class="{ 'check-btn-completed': todoItem.isCompleted }"
          class="check-btn"
          @click="toggleTodo(todoItem, index)"
        >
          <i class="fa-solid fa-check"></i>
        </span>
        {{ todoItem.content }}
        <span class="remove-btn" @click="removeTodo(todoItem, index)">
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
      localStorage.removeItem(todoItem.id);
      this.$emit("removeTodoItem", todoItem);
    },
    toggleTodo: function (todoItem, index) {
      /**
       * 클릭된 todoItem을 toggle한다.
       */
      this.$emit("toggleTodoItem", index);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

li {
  display: flex;
  align-items: center;
  min-height: 50px;
  height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.check-btn {
  cursor: pointer;
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
  margin-left: auto;
  cursor: pointer;
  color: #de4343;
}
</style>
