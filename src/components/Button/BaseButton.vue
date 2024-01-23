<script setup lang="ts">

</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
  button{
    background-color: #519945;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 123.529% */
    letter-spacing: -0.425px;
    padding: 10px 30px;
    margin-top: 25px;
  }
</style>