<script setup>
import ButtonBuy from './buttonBuy.vue';
import ButtonNext from './buttonNext.vue';

// Terima 'product' data sebagai prop
const props = defineProps({
  product: Object
});

defineEmits(['next']);

const roundedRating = Math.round(props.product.rating.rate);

</script>

<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.title">
    </div>
    <div class="product-details">
      <span class="product-category">{{ product.category }}</span>
      <h1 class="product-title">{{ product.title }}</h1>

      <div class="product-rating">
        <span class="rating-value">{{ product.rating.rate }}/5</span>
        <div class="rating-dots">
          <span v-for="n in 5" :key="n" class="dot" :class="{ filled: n <= roundedRating }">
          </span>
        </div>
      </div>
      <p class="product-description">{{ product.description }}</p>

      <div class="product-actions">
        <span class="product-price">${{ product.price }}</span>
        <div class="buttons">
          <ButtonBuy />
          <ButtonNext @click="$emit('next')" />
        </div>
      </div>
    </div>
  </div>
</template>
