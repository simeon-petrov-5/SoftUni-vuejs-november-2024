<script setup>
import { useRegisterForm } from '../composables/useRegisterForm';
import DoubleRow from './DoubleRow.vue';
import FormFieldset from './FormFieldset.vue';

const emit = defineEmits(['previous', 'submit']);

const { formData, vAddress$ } = useRegisterForm();

async function onSubmit() {
  const isValid = await vAddress$.value.$validate();
  if (isValid) {
    emit('submit');
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFieldset title="Address Line 1" :errors="vAddress$.formData.address1.$errors">
      <input
        v-model="vAddress$.formData.address1.$model" type="text" placeholder="Jane Doe ..."
        @blur="vAddress$.formData.address1.$touch"
      >
    </FormFieldset>

    <FormFieldset title="Address Line 1" :errors="[]">
      <input v-model="formData.address2" type="text" placeholder="Jane Doe ...">
    </FormFieldset>

    <DoubleRow>
      <button type="button" class="secondary" @click="$emit('previous', formData)">
        Previous
      </button>
      <button type="submit" class="primary">
        Submit
      </button>
    </DoubleRow>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 1rem;
}

input,
select {
  margin: 0;
}
</style>
