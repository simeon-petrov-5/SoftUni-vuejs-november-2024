<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
    required: Boolean,
    disabled: Boolean,
  },
};
</script>

<template>
  <fieldset :disabled="disabled">
    <label>
      <span>{{ title }} <i v-if="required">*</i></span>
      <slot />
    </label>

    <div class="errorContainer">
      <strong
        v-for="error of errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </strong>
    </div>
  </fieldset>
</template>

<style scoped>
span {
    display: block;
}

span i {
    color: red;
}

fieldset, label{
  margin: 0;
}

.errorContainer{
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: bold;
  color:red
}
</style>
