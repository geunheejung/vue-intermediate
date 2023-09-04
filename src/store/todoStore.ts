import { createStore } from "vuex";
import { FilterKeywordType, TodoListType } from "../types/todo";
import { StatusType } from "../common";
import { actions, getters, mutations } from "../actions/todoAction";

export interface IInitialState {
  todoList: TodoListType;
  status: StatusType;
  filterKeyword: FilterKeywordType;
}

const Todo = createStore<IInitialState>({
  state: () => {
    return {
      todoList: [],
      status: "REQUEST",
      filterKeyword: "ALL",
    };
  },
  getters: {
    ...getters,
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
});

export default Todo;
