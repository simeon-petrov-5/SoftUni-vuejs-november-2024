<script>
import RegistrationForm from './components/RegistrationForm.vue';

// import AppInput from './components/AppInput.vue';
// import AppNamesInput from './components/AppNamesInput.vue';
// import BasicExample from './components/BasicExample.vue';

export default {
  components: {
    RegistrationForm,
    // AppInput,
    // BasicExample,
    // AppNamesInput,
  },
  // data() {
  //   return {
  //     customText: 'Example',
  //     fName: 'Simeon',
  //     lName: 'Petrov',
  //   };
  // },
};
</script>

<template>
  <RegistrationForm />
  <!-- <AppInput
    id="example1"
    v-model="customText"
    placeholder="Write something"
    name="My custom component"
  />
  <p>Example: {{ customText }}</p>
  <AppNamesInput
    v-model:first-name="fName"
    v-model:last-name="lName"
  />
  <p>My name is: {{ fName }} {{ lName }}</p>
  <BasicExample /> -->
</template>
