<script setup lang="ts">
import {useTodo} from "@/store/todo";
import {onMounted} from "vue";

const state = useTodo()
onMounted(async () => {
  await state.getTodo();
  state.savedTodo = JSON.parse(localStorage.getItem('savedTodo')) || [];
});
</script>

<template>
  <div class="app">
    <header>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <p>© 2024</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
header {
  background-color: #474747;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  flex: 1;
  width: 100%;
  display: flex;
  background-color: #a4a4a4;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
}
footer {
  background-color: #474747;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
