<template>
  <div class="user">
    <div class="user__info">
      <div class="user__photo">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="user photo"/>
      </div>
      <div class="user__info__name">
        <h1>Name: {{ user.name }}</h1>
        <h2>Username: {{ user.username }}</h2>
        <h3>Email: {{ user.email }}</h3>
        <h3>Phone: {{ user.phone }}</h3>
      </div>
    </div>
    <div>
      <div>Address: {{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }}, {{ user.address.zipcode }}</div>
      <div>Geo: {{ user.address.geo.lat }}, {{ user.address.geo.lng }}</div>
    </div>
    <div>
      <div>Website: {{ user.website }}</div>
      <div>Company: {{ user.company.name }}</div>
      <div>Catch Phrase: {{ user.company.catchPhrase }}</div>
      <div>BS: {{ user.company.bs }}</div>
    </div>
  </div>
  <div>
    <h1>ToDo</h1>
    <div class="filters">
      <div>
        <label>Status:</label>
        <select v-model="statusFilter">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>
      <div>
        <label>User ID:</label>
        <select v-model="userIdFilter">
          <option value="all">All Users</option>
          <option v-for="user in state.users" :key="user.id" :value="user.id">{{ user.id }}</option>
        </select>
      </div>
      <div>
        <label>Search:</label>
        <input type="text" v-model="searchQuery" />
      </div>
      <div>
        <button @click="showModal = true">Add Todo</button>
      </div>
    </div>
    <div v-for="todo in task" style="display: flex; align-items: center; justify-content: center">
      <cardTodo
          :title="todo.title"
          :save="todo.saved"
          @save="state.saveTodo(todo.id)"
          :completed="todo.completed"
          :user="state.getUserById(todo.userId)"/>
    </div>
    <modal v-show="showModal" @cancel="showModal = false">
      <div>
        <h1>Add Todo</h1>
        <div>
          <label>Title:</label>
          <input type="text" v-model="addTodoTitle" />
        </div>
        <div>
          <label>User ID:</label>
          <select v-model="addTodoUserId">
            <option v-for="user in state.users" :key="user.id" :value="user.id">{{ user.id }}</option>
          </select>
        </div>
        <div>
          <button @click="addTodo()">Add Todo</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import { onMounted } from "vue";
import { useTodo } from "@/store/todo";
import CardTodo from "@/components/cardTodo.vue";
import Modal from "@/components/modal.vue";

const state = useTodo();
const user: user = state.currentUser;
const showModal = ref(false);
const addTodoTitle = ref('');
const addTodoUserId = ref(0);

const statusFilter = ref('all');
const userIdFilter = ref('all');
const searchQuery = ref('');

const task = computed(() => {
  return state.todo.filter((todo: todo) => {
    // Fix the logic for favorites
    const statusCondition =
        statusFilter.value === "all" ||
        (statusFilter.value === "completed" && todo.completed) ||
        (statusFilter.value === "uncompleted" && !todo.completed) ||
        (statusFilter.value === "favorites" && todo.saved);

    // Fix the userIdCondition comparison
    const userIdCondition = userIdFilter.value === "all" || todo.userId === userIdFilter.value;
    const searchCondition = todo.title.toLowerCase().includes(searchQuery.value.toLowerCase());

    return statusCondition && userIdCondition && searchCondition;
  });
});

function addTodo(){
  state.addTodo({title: addTodoTitle.value, userId: addTodoUserId.value})
  addTodoTitle.value = '';
  addTodoUserId.value = 0;
  showModal.value = false;
}

onMounted(async () => {
  await state.getTodo();
});
</script>

<style scoped lang="scss">

.user{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  width: 100%;

  @media (max-width: 768px){
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  &__photo{
    display: flex;
    width: 120px;
    height: 120px;
    img{
      border-radius: 50%;
    }
  }
  &__info{
    display: flex;

    &__name{
      margin-left: 16px;
    }
  }
}
.filters{
  display: flex;
  gap: 16px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}
</style>
