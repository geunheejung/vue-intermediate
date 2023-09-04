import { createStore } from "vuex";

const api = {
  getTodoList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!localStorage.length) resolve([]);

        const todoList: Array<{ content: string; isCompleted: boolean }> = [];

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i) as string;
          const value = localStorage.getItem(key) as string;
          const todoItem = JSON.parse(value);

          todoList.push(todoItem);
        }

        resolve(todoList);
      }, 1000);
    });
  },
};

const types = {
  SET_TODO_LIST: "SET_TODO_LIST",
  CHANGE_STATUS: "CHANGE_STATUS",
};

const Todo = createStore({
  state: () => {
    return {
      todoList: [],
      status: "REQUEST",
    };
  },
  mutations: {
    [types.SET_TODO_LIST](state, newTodoList) {
      state.todoList = newTodoList;
    },
    [types.CHANGE_STATUS](state, newStatus) {
      state.status = newStatus;
    },
  },
  // 상태를 변경하는 대신 액션으로 변경의 대한 커밋을 한다.
  // 작업에는 임의의 비동기 작업이 포함될 수 있다.
  actions: {
    // 액션 핸들러는 저장소 인스턴스의 같은 메서드, 프로퍼티 세트를 드러내는 컨텍스트 객체를 받는다.
    // context.commit 을 호출하여 mutation을 커밋하거나 context.state 와 context.getters 를 통해 상태, getter에 접근 가능하다.
    async fetchTodoList(context) {
      try {
        context.commit(types.CHANGE_STATUS, "REQUEST");
        const todoList = await api.getTodoList();
        // 저장소는 단일 출처이니, 현재 모듈의 대한 context인듯.
        // commit은 mutation에게 변경의 대한 정보와 함께 변경을 요청.
        context.commit(types.SET_TODO_LIST, todoList);
        context.commit(types.CHANGE_STATUS, "SUCCESS");
      } catch (error) {
        context.commit(types.CHANGE_STATUS, "FAILURE");
      }
    },
  },
});

export default Todo;
