<template>
  <div class="clear-all-container" @click="clearTodo">
    <span class="clear-all-btn">Clear All</span>

    <slot name="left">Left</slot>
    <slot name="right">Left</slot>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo: function () {
      localStorage.clear();
    },
  },
};
</script>

<style>
.clear-all-container {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background: #fff;
  border-radius: 5px;
  margin: 1rem auto 0;
}
.clear-all-btn {
  color: #e20303;
  display: block;
}
</style>
