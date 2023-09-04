import { TodoListType } from "../types/todo";

const storage = {
  todoList: () => {
    const todoList: TodoListType = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) as string;
      const value = localStorage.getItem(key) as string;
      const todoItem = JSON.parse(value);

      todoList.push(todoItem);
    }

    return todoList;
  },
};

const api = {
  todoList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!localStorage.length) resolve([]);

        const todoList = storage.todoList();

        resolve(todoList);
      }, 1000);
    });
  },
};

export const getTodoList = async () => {
  const res = await api.todoList();

  return res;
};
