<template>
  <header>
    <h1>Todo it!</h1>
    <ul class="todo-filter">
      <ol
        @click="filterTodoList('all')"
        v-bind:class="{ active: condition === 'all' }"
      >
        All
      </ol>
      <ol
        @click="filterTodoList('completed')"
        v-bind:class="{ active: condition === 'completed' }"
      >
        Completed
      </ol>
      <ol
        @click="filterTodoList('inCompleted')"
        v-bind:class="{ active: condition === 'isCompleted' }"
      >
        InCompleted
      </ol>
    </ul>
  </header>
</template>

<script>
// 필터 -> 미완성, 완성
export default {
  props: ["condition"],
  methods: {
    filterTodoList: function (condition) {
      this.$emit("filterTodoList", condition);
    },
  },
};
</script>

<style scoped>
/* scoped 파일 단위 스코프 제한 */

h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}

.todo-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.todo-filter ol {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  flex-grow: 1;
  padding: 0;
  cursor: pointer;
  background: #fff;
  color: #b3adad;
}

.todo-filter ol.active {
  color: #62acde;
  font-weight: 700;
}

@media (min-width: 600px) {
  .todo-filter {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
