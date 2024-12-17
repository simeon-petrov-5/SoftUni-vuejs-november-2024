<script setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../stores/useUserStore';
import FormFieldset from './Register/components/FormFieldset.vue';

const userStore = useUserStore();

const form = ref({
  username: 'emilys',
  password: 'emilyspass',
});

const rules = computed(() => ({
  form: {
    username: { required },
    password: { required },
  },
}));

const v$ = useVuelidate(rules, { form });

onMounted(() => userStore.reAuthUser());

async function onLogin() {
  const isValid = await v$.value.$validate();
  if (!isValid)
    return;

  await userStore.loginUser(form.value);
}
</script>

<template>
  <div class="formContainer">
    <article>
      <form @submit.prevent="onLogin">
        <FormFieldset title="Confirm" :errors="v$.form.username.$errors">
          <input v-model="v$.form.username.$model" type="password" placeholder="Enter username">
        </FormFieldset>

        <FormFieldset title="Password" :errors="v$.form.password.$errors">
          <input v-model="v$.form.password.$model" type="password" placeholder="Enter password">
        </FormFieldset>

        <button class="primary" type="submit">
          Login
        </button>
      </form>
    </article>
  </div>
</template>

<style scoped>
.formContainer {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.formContainer article {
  width: 100%;
  max-width: 500px;
}
</style>
