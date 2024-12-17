<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const headingElement = ref(null);

onClickOutside(headingElement, event => console.log(event));
</script>

<template>
  <h1 ref="headingElement">
    HOME - Click outside of this!
  </h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dignissimos sit alias magni deleniti quisquam
    quas nihil id repellendus aliquam, ad temporibus eligendi voluptatem fugiat tempora perspiciatis saepe, illo
    mollitia.
  </p>
</template>
