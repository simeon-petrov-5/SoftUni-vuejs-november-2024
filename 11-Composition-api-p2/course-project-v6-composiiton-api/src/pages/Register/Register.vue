<script>
import AddressForm from './components/AddressForm.vue';
import GeneralForm from './components/GeneralForm.vue';
import { useRegisterForm } from './composables/useRegisterForm';

export default {
  components: {
    GeneralForm,
    AddressForm,
  },
  setup() {
    const { formData, reset } = useRegisterForm();
    return { formData, reset };
  },
  data() {
    return {
      activeStep: 'general',
    };
  },
  methods: {
    goNext() {
      this.activeStep = 'address';
    },
    goPrevious() {
      this.activeStep = 'general';
    },
    onSubmit() {
      console.log('I WAS FINALLY SUBMITTED', this.formData);
      this.resetForms();
    },
    resetForms() {
      this.reset();
      this.activeStep = 'general';
    },
  },
};
</script>

<template>
  <section>
    <article>
      <header>
        <h1>
          {{ activeStep === 'general' ? 'Step 1: General Information' : 'Step 2: Address Information' }}
        </h1>
      </header>
      <GeneralForm v-if="activeStep === 'general'" @next="goNext" />
      <AddressForm v-else @previous="goPrevious" @submit="onSubmit" />
    </article>
  </section>
</template>

<style scoped>
section {
  padding: 1rem;
}

article {
  max-width: 800px;
  margin: auto;
}
</style>
