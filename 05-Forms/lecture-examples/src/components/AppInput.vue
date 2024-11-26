<script>
export default {
  props: {
    disabled: Boolean,
    placeholder: String,
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <fieldset :disabled="disabled">
    <label :for="id">{{ name }}</label>
    <input
      :id="id"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </fieldset>
</template>
