<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/productCard.vue';
import ErrorUnavailablePage from './ErrorUnavailablePage.vue';

// --- State Management ---
const product = ref(null);
const currentIndex = ref(1); // Index dimulai dari 1
const loading = ref(true);
const isUnavailable = ref(false); // State untuk produk "unavailable"

// --- API Call Function ---
const fetchProduct = async () => {
  loading.value = true;
  isUnavailable.value = false;
  product.value = null; // Bersihkan produk sebelumnya

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${currentIndex.value}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    // **Logika Poin 5: Cek Kategori**
    if (data.category === "men's clothing" || data.category === "women's clothing") {
      product.value = data;
      isUnavailable.value = false;
    } else {
      // Jika kategori lain, set state unavailable
      isUnavailable.value = true;
    }

  } catch (error) {
    console.error('Fetch error:', error);
    isUnavailable.value = true; // Anggap error sebagai unavailable
  } finally {
    loading.value = false;

    // **Logika Poin 4 & 6: Increment Index**
    if (currentIndex.value === 20) {
      currentIndex.value = 1; // Kembali ke 1 jika sudah 20
    } else {
      currentIndex.value++; // Increment index
    }
  }
};

// --- Lifecycle Hook ---
// Panggil API saat komponen pertama kali di-mount
onMounted(() => {
  fetchProduct();
});

// --- Dynamic Class Binding (Poin 4 Desain) ---
const pageClass = computed(() => {
  if (isUnavailable.value) {
    return 'page-unavailable';
  }
  if (product.value?.category === "men's clothing") {
    return 'page-men';
  }
  if (product.value?.category === "women's clothing") {
    return 'page-women';
  }
  return 'page-default'; // Fallback
});
</script>

<template>
  <div id="home-view-container" :class="pageClass">

    <div v-if="loading" class="product-card loading-card">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>

    <ErrorUnavailablePage v-else-if="isUnavailable" @next="fetchProduct" />

    <ProductCard v-else-if="product" :product="product" @next="fetchProduct" />

  </div>
</template>

<style scoped>
#home-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
}
</style>
