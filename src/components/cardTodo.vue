<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  completed: Boolean,
  user: String,
  save: Boolean
})
</script>

<template>
  <div class="cardTodo">
    <div class="cardTodo__block">
      <div class="cardTodo__block__user">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="user photo" width="40" height="40"/>
        <div>{{ user }}</div>
      </div>
      <div>{{ title }}</div>
    </div>
    <div class="cardTodo__saved" @click="$emit('save')">
      <svg v-if="save" width="35" viewBox="0 0 480 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M378 449C374.632 449.013 371.346 447.963 368.61 446L240 352.76L111.39 446C108.642 447.993 105.332 449.06 101.938 449.048C98.543 449.036 95.241 447.944 92.508 445.931C89.775 443.919 87.753 441.089 86.734 437.851C85.715 434.613 85.752 431.135 86.84 427.92L137 279.35L6.99989 190.2C4.18409 188.271 2.05879 185.492 0.934688 182.27C-0.189512 179.047 -0.253512 175.549 0.751788 172.287C1.75709 169.026 3.77919 166.171 6.52259 164.14C9.26589 162.109 12.5868 161.009 15.9999 161H176.38L224.78 12.0501C225.823 8.83436 227.857 6.03146 230.591 4.04346C233.326 2.05556 236.619 0.984863 240 0.984863C243.381 0.984863 246.674 2.05556 249.409 4.04346C252.143 6.03146 254.177 8.83436 255.22 12.0501L303.62 161.05H464C467.417 161.048 470.746 162.141 473.497 164.168C476.249 166.195 478.279 169.049 479.291 172.314C480.302 175.578 480.242 179.08 479.119 182.308C477.996 185.536 475.869 188.319 473.05 190.25L343 279.35L393.13 427.88C393.942 430.285 394.171 432.848 393.796 435.359C393.422 437.869 392.456 440.255 390.978 442.318C389.5 444.381 387.552 446.063 385.295 447.225C383.039 448.387 380.538 448.996 378 449Z" fill="#CF972B"/>
      </svg>
      <svg v-else width="35" viewBox="0 0 481 449" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M464.178 176.197H292.178L240.178 16.1968L188.178 176.197H16.1777L156.178 272.197L102.178 432.197L240.178 332.197L378.178 432.197L324.178 272.197L464.178 176.197Z" stroke="black" stroke-width="32" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="cardTodo__status" :class="completed ? 'cardTodo__status__done' : 'cardTodo__status__notDone'">
      <div>{{ completed ? 'Done' : 'Not Done' }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cardTodo{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-bottom: 1px solid #000;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 90%;
  }

  &__block{
    padding: 20px;
    display: flex;
    width: 100%;
    flex-direction: column;

    &__user{
      display: flex;
      flex-direction: row;
      align-items: center;
      img{
        margin-right: 10px;
      }
    }
  }
  &__saved{
    margin-right: 20px;
  }
  &__status{
    width: 100px;
    &__done{
      color: green;
    }
    &__notDone{
      color: red;
    }
  }
}
</style>