<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import ProductsSelector from './components/ProductsSelector.vue';
import ProductsSelectorCompAPI from './components/ProductsSelectorCompAPI.vue';
// import SimpleComposition from './components/SimpleComposition.vue';
</script>

<template>
  <!-- <HelloWorld /> -->
  <!-- <SimpleComposition :initial-count="15" @increment="console.log('I was incremented', $event)" /> -->
  <div class="myContainer">
    <ProductsSelector />
    <ProductsSelectorCompAPI />
  </div>
</template>

<style>
.myContainer{
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
