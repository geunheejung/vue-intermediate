<script>
import Spinner from "vue-simple-spinner";
import { mapState, mapGetters, mapActions } from "vuex";

// setup 키워드 등록 안해줄 경우 템플릿에서 직접 사용할 수 없기에 직접 연결해줘야 하는듯.
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoSearch from "./components/TodoSearch.vue";
import TodoFooter from "./components/TodoFooter.vue";
import { FILTER_KEYWORD } from "./types/todo";
import { types } from "./actions/todoAction";

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoSearch,
    TodoFooter,
    Spinner,
  },
  data: function () {
    return {
      todoTitle: "Default Todo",
      searchKeyword: "",
    };
  },
  created: function () {
    this.$store.dispatch(types.FETCH_TODO_LIST);
  },
  methods: {
    ...mapActions([...Object.keys(types)]),
    addTodoItem: function (newTodoItem) {
      this[types.ADD_TODO_ITEM](newTodoItem);
    },
    removeTodoItem: function (removeTodoItem) {
      this[types.REMOVE_TODO_ITEM](removeTodoItem);
    },
    toggleTodoItem: function (targetIndex) {
      this[types.TOGGLE_TODO_ITEM](targetIndex);
    },
    filterTodoList: function (filterKeyword) {
      this[types.SET_FILTER_KEYWORD](filterKeyword);
    },
    searchTodoItem(keyword) {
      this.searchKeyword = keyword;
    },
  },
  // 템플릿 내에서의 데이터 접근은 최소화하고, 연산 또는 데이터 접근에 대해서는 스크립트 내에서 처리한 뒤 바인딩 해주는게 권고.
  computed: {
    // computed에서 mapState 호출 시 반환된 객체의 대해서 전부 할당해줘야하기에, 스프레드 오퍼레이터가 써야함.
    ...mapState(["todoList", "filterKeyword", "status"]),
    ...mapGetters(["isCompletedFetch", "searchedTodoItem"]),

    filteredTodoItems: function () {
      const { todoList, filterKeyword, searchKeyword, searchedTodoItem } = this;

      // keyword를 전달 받으면, keyword에 따른 filterList를 만들어내고, 이 filterList를 토대로 completed
      // keyword를 받아서 데이터 리스트를 저장하든
      // keyword를 저장하든 상위에서 남겨놔야 효율적으로 처리 가능함
      // 또는 keyword를 vuex로 관리해도 될듯 -> todo의 대한 ui상태

      const _todoList = searchedTodoItem(searchKeyword);

      if (filterKeyword === FILTER_KEYWORD.ALL) return _todoList;
      return _todoList.filter(({ isCompleted }) =>
        filterKeyword === FILTER_KEYWORD.COMPLETED ? isCompleted : !isCompleted
      );
    },
  },
};
</script>

<template>
  <div>
    <div class="spinner" v-if="!isCompletedFetch">
      <span>Loading...</span>
    </div>
    <div v-if="isCompletedFetch">
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
      <TodoSearch @searchTodoItem="searchTodoItem"></TodoSearch>
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
