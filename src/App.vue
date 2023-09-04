<script>
import Spinner from "vue-simple-spinner";

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
    Spinner,
  },
  data: function () {
    return {
      todoTitle: "Default Todo",
      todoItems: [],
      condition: "all",
    };
  },
  created: function () {
    this.$store.dispatch("fetchTodoList");
  },
  methods: {
    addTodoItem: function (newTodoItem) {
      this.todoItems.push(newTodoItem);
    },
    removeTodoItem: function (removeTodoItem) {
      const { id } = removeTodoItem;
      this.todoItems = this.todoItems.filter((todo, index) => todo.id !== id);
    },
    toggleTodoItem: function (targetIndex) {
      this.todoItems[targetIndex].isCompleted =
        !this.todoItems[targetIndex].isCompleted;
    },
    filterTodoList: function (condition) {
      this.condition = condition;
    },
  },
  computed: {
    filteredTodoItems: function () {
      const { todoList, condition } = this;

      if (condition === "all") return todoList;
      return todoList.filter(({ isCompleted }) =>
        condition === "completed" ? isCompleted : !isCompleted
      );
    },
    todoList: function () {
      const {
        state: { todoList },
      } = this.$store;

      return todoList;
    },
    isCompletedFetching: function () {
      const {
        state: { status },
      } = this.$store;

      return status === "SUCCESS";
    },
  },
};
</script>

<template>
  <div>
    <div
      style="
         {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      "
      v-if="!isCompletedFetching"
    >
      <span>Loading...</span>
    </div>
    <div v-if="isCompletedFetching">
      <TodoHeader @filterTodoList="filterTodoList" v-bind:condition="condition">
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
      <TodoFooter>
        <template v-slot:left>
          <h3>{{ todoItems.length ? todoItems[0].content : "Empty" }}</h3>
        </template>
        <template v-slot:right>
          <p>{{ condition }}</p>
        </template>
      </TodoFooter>
    </div>
  </div>
</template>

<style scoped>
.test {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
