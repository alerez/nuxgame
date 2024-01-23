<script setup lang="ts">
import { ref } from "vue";
import { useTodo } from "@/store/todo";
import { useRouter } from "vue-router";

import BaseInput from "@/components/Form/BaseInput.vue";
import BaseButton from "@/components/Button/BaseButton.vue";



const state  = useTodo()
const router = useRouter()
const username = ref('Bret')
const phone = ref('1-770-736-8031 x56442')

async function getLoggedInUser(user: any){
  await state.getLoggedInUser({username: username.value, phone: phone.value})
  if(state.isLoggedIn){
    await router.push('/todo')
  }
}
</script>

<template>
  <div class="login">
    <div class="login__block">
      <h1>Login</h1>
      <BaseInput type="username" placeholder="Username" v-model="username" />
      <BaseInput type="phone" placeholder="Phone" v-model="phone"/>
      <BaseButton type="submit" @click="getLoggedInUser">Login</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h1{
      align-self: center;
    }
    &__block{
      background-color: #C3C3C3;
      border-radius: 5px;
      padding: 25px;
      display: flex;
      flex-direction: column;

    }
  }
</style>
