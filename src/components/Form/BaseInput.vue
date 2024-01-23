<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <input :type="type" :placeholder="placeholder" />
</template>

<style scoped lang="scss">
input{
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-family: Roboto, sans-serif;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 123.529% */
  letter-spacing: -0.425px;
  color: #000;
  min-width: 300px;
}
</style>