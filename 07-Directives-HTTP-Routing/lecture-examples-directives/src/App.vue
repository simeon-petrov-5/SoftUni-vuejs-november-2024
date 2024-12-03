<script>
const focusDirectiveLogic = {
  mounted: (element, bindingData) => {
    console.log('MOUNTED', element, bindingData);
    if (bindingData.value) {
      element.focus();
    }
  },
  updated: (element, bindingData) => {
    console.log('UPDATED', element, bindingData);
    if (bindingData.value) {
      element.focus();
    }
  },
};

const colorDir = {
  mounted: (el, binding) => {
    if (binding.arg === 'background') {
      el.style.backgroundColor = binding.value;
    }
    else {
      el.style.color = binding.value;
    }
  },
};

export default {
  directives: {
    focus: focusDirectiveLogic,
    color: colorDir,
  },
  data() {
    return {
      shouldFocus: false,
    };
  },
};
</script>

<template>
  <button @click="shouldFocus = !shouldFocus">
    Toggle {{ shouldFocus }}
  </button>
  <input v-focus="shouldFocus">

  <p v-color="'red'">
    I'm using v-color with text
  </p>
  <p v-color:background="'green'">
    I'm using v-color with background
  </p>
</template>
