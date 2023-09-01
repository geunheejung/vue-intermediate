<script>
// setup 키워드 등록 안해줄 경우 템플릿에서 직접 사용할 수 없기에 직접 연결해줘야 하는듯.
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },
  data: function () {
    return {
      todoItems: [],
    };
  },
  created: function () {
    if (!localStorage.length) return;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      this.todoItems.push(key);
    }
  },
  methods: {
    addTodoItem: function (newTodoItem) {
      this.todoItems.push(newTodoItem);
    },
    removeTodoItem: function (removeTodoItem) {
      this.todoItems = this.todoItems.filter((todo) => todo !== removeTodoItem);
    },
  },
};
</script>

<template>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput @addTodoItem="addTodoItem"></TodoInput>
    <TodoList
      v-bind:todo-list="todoItems"
      @removeTodoItem="removeTodoItem"
    ></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<style scoped></style>
