<script>
import useVuelidate from '@vuelidate/core';
import { alphaNum, email, helpers, maxLength, minLength, numeric, required, sameAs } from '@vuelidate/validators';
import DoubleRow from './DoubleRow.vue';
import FormFieldset from './FormFieldset.vue';

const separateNames = helpers.regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/);

function minimalAge(minAge) {
  return helpers.withParams(
    { minAge },
    (value) => {
      const age = new Date(new Date() - new Date(value)).getFullYear() - 1970;
      return age > minAge;
    },
  );
}

export default {
  components: {
    FormFieldset,
    DoubleRow,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  emits: ['next'],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      formData: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        gender: '',
        dateOfbirth: '',
      },
    };
  },
  validations() {
    return {
      formData: {
        name: {
          required,
          separateNames: helpers.withMessage('Field must contain two names (letters only) separated by a space. Both should start with a capital letter', separateNames),
        },
        password: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(16),
          alphaNum,
        },
        confirmPassword: {
          sameAsPassword: sameAs(this.formData.password),
        },
        email: { required, email },
        phone: {
          required,
          numeric,
          minLength:
            minLength(9),
          maxLength: maxLength(9),
        },
        gender: { required },
        dateOfbirth: {
          required,
          minimalAge: helpers.withMessage(
            ({
              $params,
            }) => `You must be ${$params.minAge}+ yeas old`,
            minimalAge(13),
          ),
        },
      },
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        const areSame = oldVal && (JSON.stringify(Object.entries(newVal).sort())
          === JSON.stringify(Object.entries(oldVal).sort()));
        if (!areSame) {
          this.initState(newVal);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async onSubmit() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.$emit('next', this.formData);
      }
    },
    initState(dataPropVal) {
      this.formData = {
        name: dataPropVal.name,
        password: dataPropVal.password,
        confirmPassword: dataPropVal.confirmPassword,
        email: dataPropVal.email,
        phone: dataPropVal.phone,
        gender: dataPropVal.gender,
        dateOfbirth: dataPropVal.dateOfbirth,
      };
    },
  },
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFieldset title="Name" :errors="v$.formData.name.$errors">
      <input v-model="formData.name" type="text" placeholder="Jane Doe ..." @blur="v$.formData.name.$touch">
    </FormFieldset>

    <DoubleRow>
      <FormFieldset title="Password" :errors="v$.formData.password.$errors">
        <input v-model="v$.formData.password.$model" type="password" placeholder="Strong password ...">
      </FormFieldset>
      <FormFieldset title="Confirm" :errors="v$.formData.confirmPassword.$errors">
        <input v-model="v$.formData.confirmPassword.$model" type="password" placeholder="Confirm password ...">
      </FormFieldset>
    </DoubleRow>

    <DoubleRow>
      <FormFieldset title="Email" :errors="v$.formData.email.$errors">
        <input v-model="v$.formData.email.$model" type="email" placeholder="janedoe@gmail.com ...">
      </FormFieldset>
      <FormFieldset title="Phone Number" :errors="v$.formData.phone.$errors">
        <input v-model.number="v$.formData.phone.$model" type="text" placeholder="359 999 999 ...">
      </FormFieldset>
    </DoubleRow>

    <DoubleRow>
      <FormFieldset title="Gender" :errors="v$.formData.gender.$errors">
        <select v-model="v$.formData.gender.$model">
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
      <FormFieldset title="Date of Birth" :errors="v$.formData.dateOfbirth.$errors">
        <input v-model="v$.formData.dateOfbirth.$model" type="date" placeholder="359 999 999 ...">
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
