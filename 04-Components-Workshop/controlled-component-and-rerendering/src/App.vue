<script>
import AppInput from './components/AppInput.vue';
import ButtonCounter from './components/ButtonCounter.vue';

export default {
  components: {
    AppInput,
    ButtonCounter,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    handleFirstName(text) {
      this.firstName = text;
    },
    handleLastName(text) {
      this.lastName = text;
    },
    resetAll() {
      this.firstName = '';
      this.lastName = '';
    },
  },
};
</script>

<template>
  <button class="contrast" @click="resetAll">
    Reset EVERYTHING
  </button>
  <AppInput :value="firstName" @change="handleFirstName" />
  <AppInput :value="lastName" @change="handleLastName" />

  <ButtonCounter :text="firstName" />
</template>
