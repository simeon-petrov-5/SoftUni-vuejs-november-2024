import useVuelidate from '@vuelidate/core';
import { alphaNum, email, helpers, maxLength, minLength, numeric, required, sameAs } from '@vuelidate/validators';
import { computed, ref } from 'vue';

function initUserInfo() {
  return {
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    gender: '',
    dateOfbirth: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
    payment: '',
    note: '',
  };
}

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

const formData = ref(initUserInfo());

export function useRegisterForm() {
  const generalRules = computed(() => {
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
          sameAsPassword: sameAs(formData.value.password),
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
  });

  const vGeneral$ = useVuelidate(generalRules, { formData });

  const addressRules = computed(() => {
    return {
      formData: {
        address1: {
          required,
          minLength: minLength(5),
        },
      },
    };
  });

  const vAddress$ = useVuelidate(addressRules, { formData });

  const reset = () => {
    formData.value = initUserInfo();
  };

  return {
    formData,
    vGeneral$,
    vAddress$,
    reset,
  };
}
