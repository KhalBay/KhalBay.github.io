<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    default: 0
  },
  animationType: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="tile">
    <transition
      :name="animationType"
      mode="out-in"
      appear
    >
      <p
        v-if="value"
        :class="`tile-${value}`"
      >
        {{ value }}
      </p>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.tile {
  width: 100px;
  height: 100px;
  background-color: #a5a5a5;
  border-radius: 2px;
}
@media (max-width: 510px) {
  .tile {
    width: 60px;
    height: 60px;

    p {
      font-size: 25px;
    }
  }
}

//Animations
$translate: 100px;
.creat-enter-active {
  transition: all 0.2s ease-out;
}
.up-enter-active, .down-enter-active, .left-enter-active, .right-enter-active,
.up-leave-active, .down-leave-active, .left-leave-active, .right-leave-active {
  transition: all 0.1s ease-out;
}
.up-enter-from,
.down-leave-to {
  transform: translateY($translate);
  z-index: 2;
  opacity: 0;
}
.up-leave-to,
.down-enter-from {
  transform: translateY(-$translate);
  z-index: 2;
  opacity: 0;
}
.left-enter-from,
.right-leave-to {
  transform: translateX($translate);
  z-index: 2;
  opacity: 0;
}
.left-leave-to,
.right-enter-from {
  transform: translateX(-$translate);
  z-index: 2;
  opacity: 0;
}
.creat-enter-from {
  transform: scale(.4);
  z-index: 2;
  opacity: 0;
}
</style>