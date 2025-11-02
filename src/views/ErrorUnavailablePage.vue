<script setup>
import ButtonNext from '../components/buttonNext.vue';

defineEmits(['next']);
</script>

<template>
  <div class="product-card unavailable-card">
    <div class="sad-face">:(</div>
    <p>This product is unavailable to show</p>
    <ButtonNext @click="$emit('next')" />
  </div>
</template>
