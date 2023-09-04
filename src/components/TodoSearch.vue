<template>
  <div>
    <div class="input-box shadow">
      <input type="text" v-model="keyword" v-on:keyup.enter="searchTodoItem" />
      <span class="add-container" v-on:click="clear">
        <i class="fa-solid fa-x add-btn"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      keyword: "",
    };
  },
  methods: {
    searchTodoItem() {
      this.$emit("searchTodoItem", this.keyword);
    },
    clear: function () {
      this.$emit("searchTodoItem", "");
      this.keyword = "";
    },
  },
};
// search keyword를 App vue에서 관리하고, search keyword에 따라 filter list를 처리하자
// 부모에서 이벤트 받아와서 연결해줘야 함.
// keyword만 관리하고 검색 버튼 입력 시 검색 되게 해도 될듯.
</script>

<style scoped>
.input-box input:focus {
  outline: none;
}

.input-box {
  display: flex;
  height: 50px;
}

.input-box input {
  flex-grow: 1;
  padding: 0 0.9rem;
  border-style: none;
  border-radius: 5px 0 0 5px;
  font-size: 0.9rem;
}

.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 3rem;
  background: linear-gradient(to right, #6478fb, #8763fb);
  border-radius: 0 5px 5px 0;
}

.add-btn {
  color: #fff;
}
</style>
