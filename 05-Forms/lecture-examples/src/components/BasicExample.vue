<script>
export default {
  data() {
    return {
      firstName: 'Simeon',
      lastName: 'Petrov',
      message: '',
      frameworks: [],
      acceptedTerms: 'Accept',
      car: '',
      isSelected: false,
      wasToggled: 'yes',
    };
  },
  methods: {
    onInput(event) {
      this.firstName = event.target.value;
    },
  },
};
</script>

<template>
  <article>
    <header>
      Leave your feedback
    </header>

    <input type="text" :value="firstName" @input="onInput">
    <p>My firstName: {{ firstName }}</p>

    <input v-model="lastName" type="text">
    <p>My lastName: {{ lastName }}</p>

    <textarea v-model="message" placeholder="Write me a message" />
    <p>My message: {{ message }}</p>

    <fieldset>
      <p>Select your favourite JS framework</p>

      <label>
        <input v-model="frameworks" type="checkbox" value="vue">
        Vue
      </label>
      <label>
        <input v-model="frameworks" type="checkbox" value="tsx">
        React
      </label>
      <label>
        <input v-model="frameworks" type="checkbox" value="ng">
        Angular
      </label>

      <p>Selected: {{ JSON.stringify(frameworks) }}</p>
    </fieldset>

    <fieldset>
      Accept the website terms!
      <label>
        <input v-model="acceptedTerms" type="radio" value="Accept"> Accept
      </label>
      <label>
        <input v-model="acceptedTerms" type="radio" value="Decline"> Decline
      </label>
      <p>Accepted value is: {{ acceptedTerms }}</p>
    </fieldset>

    <fieldset>
      <p>Select your car</p>

      <select v-model="car">
        <option disabled value="0">
          Please select car manufacturer
        </option>
        <option value="1">
          Opel
        </option>
        <option value="2">
          Ferrary
        </option>
        <option value="3">
          Mercedes
        </option>
      </select>

      <p>My car is: {{ car }}</p>
    </fieldset>

    <fieldset>
      <label for="">
        <input
          v-model="wasToggled"
          type="checkbox"
          true-value="yes"
          false-value="no"
        >
        Was I toggled? <span>{{ wasToggled }}</span>
      </label>

      <label for="">
        <input
          v-model="isSelected"
          type="checkbox"
          value="true"
        >
        Was I selected? <span>{{ isSelected }}</span>
      </label>
    </fieldset>
  </article>
</template>

<style scoped>
article {
  max-width: 500px;
  margin: 4rem auto 0;

  fieldset {
    border: 1px lightcoral solid;
  }
}
</style>
