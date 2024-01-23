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

<style scoped>

</style>