<script setup lang="ts">

</script>

<template>
  <div class="modal" @click="$emit('cancel')">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content{
    background-color: #fff;
    border-radius: 5px;
    padding: 25px;
    display: flex;
    flex-direction: column;
  }
}
</style>