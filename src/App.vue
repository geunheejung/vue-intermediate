<script>
import Spinner from "vue-simple-spinner";

// setup 키워드 등록 안해줄 경우 템플릿에서 직접 사용할 수 없기에 직접 연결해줘야 하는듯.
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";
import { types } from "./modules/Todo";
import { FILTER_KEYWORD } from "./types/todo";
import { FETCH_STATUS } from "./modules/common";

export default {
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
    Spinner,
  },
  data: function () {
    return {
      todoTitle: "Default Todo",
    };
  },
  created: function () {
    this.$store.dispatch(types.FETCH_TODO_LIST);
  },
  methods: {
    addTodoItem: function (newTodoItem) {
      this.$store.dispatch(types.ADD_TODO_ITEM, newTodoItem);
    },
    removeTodoItem: function (removeTodoItem) {
      this.$store.dispatch(types.REMOVE_TODO_ITEM, removeTodoItem);
    },
    toggleTodoItem: function (targetIndex) {
      this.$store.dispatch(types.TOGGLE_TODO_ITEM, targetIndex);
    },
    filterTodoList: function (filterKeyword) {
      this.$store.dispatch(types.SET_FILTER_KEYWORD, filterKeyword);
    },
  },
  computed: {
    filteredTodoItems: function () {
      const { todoList, filterKeyword } = this;

      if (filterKeyword === FILTER_KEYWORD.ALL) return todoList;
      return todoList.filter(({ isCompleted }) =>
        filterKeyword === FILTER_KEYWORD.COMPLETED ? isCompleted : !isCompleted
      );
    },
    todoList: function () {
      const {
        state: { todoList },
      } = this.$store;

      return todoList;
    },
    filterKeyword: function () {
      return this.$store.state.filterKeyword;
    },
    isCompletedFetching: function () {
      const {
        state: { status },
      } = this.$store;

      return status === FETCH_STATUS.SUCCESS;
    },
  },
};
</script>

<template>
  <div>
    <div class="spinner" v-if="!isCompletedFetching">
      <span>Loading...</span>
    </div>
    <div v-if="isCompletedFetching">
      <TodoHeader
        @filterTodoList="filterTodoList"
        v-bind:condition="filterKeyword"
      >
        <i class="fa-solid fa-gamepad"></i>{{ todoTitle }}
        <template v-slot:date="{ date, prefix = 'Today' }">
          {{ prefix }}{{ date }}
        </template>
      </TodoHeader>
      <TodoInput @addTodoItem="addTodoItem"></TodoInput>
      <TodoList
        v-bind:todo-list="filteredTodoItems"
        @removeTodoItem="removeTodoItem"
        @toggleTodoItem="toggleTodoItem"
      ></TodoList>
      <TodoFooter> </TodoFooter>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
