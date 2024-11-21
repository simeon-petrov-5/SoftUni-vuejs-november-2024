<script>
import AcceptBtn from './components/AcceptBtn.vue';
import ButtonCounter from './components/ButtonCounter.vue';
import DeclineBtn from './components/DeclineBtn.vue';
import Layout from './components/Layout.vue';

export default {
  components: {
    ButtonCounter,
    AcceptBtn,
    DeclineBtn,
    Layout,
  },
  data() {
    return {
      cutomText: 'MY TITLE',
      wasAccepted: false,
    };
  },
};
</script>

<template>
  <div class="appDiv">
    <h1>Components examples</h1>
    <input v-model="cutomText" type="text">
    <ButtonCounter
      :title-text="cutomText" text="I was clicked x: "
      @was-incremented="(arg) => console.log('wasIncremented', arg)"
    />
  </div>
  <!-- <ButtonCounter text="1234" disabled /> -->

  <br>
  <br>

  <!-- <ButtonCounter text="Make it toggle" @was-incremented="wasAccepted = !wasAccepted" /> -->

  <component :is="wasAccepted ? 'AcceptBtn' : 'DeclineBtn'" />

  <Layout>
    <template #header>
      <div>
        This is my new header
      </div>
    </template>

    hello world
    <!-- <ButtonCounter text="1234" disabled /> -->
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi illum adipisci fugit qui, a, nihil earum sapiente,
      eaque molestias itaque neque inventore quo ad vero vitae sed sequi optio. Nemo.
    </p>
  </Layout>
</template>

<style scoped>
.appDiv :deep(.btnTitle){
  background-color: lightcoral
}
</style>
