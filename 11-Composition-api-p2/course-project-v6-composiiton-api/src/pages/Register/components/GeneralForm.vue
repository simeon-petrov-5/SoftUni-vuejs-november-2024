<script setup>
import { useRegisterForm } from '../composables/useRegisterForm';
import DoubleRow from './DoubleRow.vue';
import FormFieldset from './FormFieldset.vue';

const emit = defineEmits(['next']);

const { formData, vGeneral$ } = useRegisterForm();

async function onSubmit() {
  const isValid = await vGeneral$.value.$validate();
  if (isValid) {
    emit('next');
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFieldset title="Name" :errors="vGeneral$.formData.name.$errors">
      <input v-model="formData.name" type="text" placeholder="Jane Doe ..." @blur="vGeneral$.formData.name.$touch">
    </FormFieldset>

    <DoubleRow>
      <FormFieldset title="Password" :errors="vGeneral$.formData.password.$errors">
        <input v-model="vGeneral$.formData.password.$model" type="password" placeholder="Strong password ...">
      </FormFieldset>
      <FormFieldset title="Confirm" :errors="vGeneral$.formData.confirmPassword.$errors">
        <input v-model="vGeneral$.formData.confirmPassword.$model" type="password" placeholder="Confirm password ...">
      </FormFieldset>
    </DoubleRow>

    <DoubleRow>
      <FormFieldset title="Email" :errors="vGeneral$.formData.email.$errors">
        <input v-model="vGeneral$.formData.email.$model" type="email" placeholder="janedoe@gmail.com ...">
      </FormFieldset>
      <FormFieldset title="Phone Number" :errors="vGeneral$.formData.phone.$errors">
        <input v-model.number="vGeneral$.formData.phone.$model" type="text" placeholder="359 999 999 ...">
      </FormFieldset>
    </DoubleRow>

    <DoubleRow>
      <FormFieldset title="Gender" :errors="vGeneral$.formData.gender.$errors">
        <select v-model="vGeneral$.formData.gender.$model">
          <option value="">
            Select gender
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
          <option value="other">
            Other
          </option>
        </select>
      </FormFieldset>
      <FormFieldset title="Date of Birth" :errors="vGeneral$.formData.dateOfbirth.$errors">
        <input v-model="vGeneral$.formData.dateOfbirth.$model" type="date" placeholder="359 999 999 ...">
      </FormFieldset>
    </DoubleRow>

    <button type="submit" class="primary">
      NEXT
    </button>
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
