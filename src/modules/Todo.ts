import { createStore } from "vuex";
import { FilterKeywordType, ITodo, TodoListType } from "../types/todo";
import { StatusType, FETCH_STATUS } from "./common";
import { getTodoList } from "../services/todo";

export const types = {
  SET_TODO_LIST: "SET_TODO_LIST",
  CHANGE_STATUS: "CHANGE_STATUS",
  ADD_TODO_ITEM: "ADD_TODO_ITEM",
  REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
  TOGGLE_TODO_ITEM: "TOGGLE_TODO_ITEM",
  SET_FILTER_KEYWORD: "SET_FILTER_KEYWORD",
  FETCH_TODO_LIST: "FETCH_TODO_LIST",
};

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
  mutations: {
    [types.SET_TODO_LIST](state, newTodoList) {
      state.todoList = newTodoList;
    },
    [types.CHANGE_STATUS](state, newStatus) {
      state.status = newStatus;
    },
    [types.ADD_TODO_ITEM](state, newTodoItem: ITodo) {
      state.todoList.push(newTodoItem);
    },
    [types.REMOVE_TODO_ITEM](state, removeTodoItem: ITodo) {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== removeTodoItem.id
      );
    },
    [types.TOGGLE_TODO_ITEM](state, toggleTodoIndex: number) {
      state.todoList[toggleTodoIndex].isCompleted =
        !state.todoList[toggleTodoIndex].isCompleted;
    },
    [types.SET_FILTER_KEYWORD](state, filterKeyword: FilterKeywordType) {
      state.filterKeyword = filterKeyword;
    },
  },
  actions: {
    async [types.FETCH_TODO_LIST](context) {
      try {
        context.commit(types.CHANGE_STATUS, FETCH_STATUS.REQUEST);
        const todoList = await getTodoList();
        context.commit(types.SET_TODO_LIST, todoList);
        context.commit(types.CHANGE_STATUS, FETCH_STATUS.SUCCESS);
      } catch (error) {
        context.commit(types.CHANGE_STATUS, FETCH_STATUS.FAILURE);
      }
    },
    [types.ADD_TODO_ITEM](context, payload) {
      context.commit(types.ADD_TODO_ITEM, payload);
    },
    [types.REMOVE_TODO_ITEM](context, payload) {
      context.commit(types.REMOVE_TODO_ITEM, payload);
    },
    [types.TOGGLE_TODO_ITEM](context, payload) {
      context.commit(types.TOGGLE_TODO_ITEM, payload);
    },
    [types.SET_FILTER_KEYWORD](context, payload) {
      context.commit(types.SET_FILTER_KEYWORD, payload);
    },
  },
});

export default Todo;
