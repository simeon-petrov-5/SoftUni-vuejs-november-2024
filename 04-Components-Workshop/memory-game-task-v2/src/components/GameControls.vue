<script>
const GAME_TIME = 5;
let interval;

export default {
  props: {
    isPlaying: {
      type: Boolean,
      required: true,
    },
    hasWon: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['start', 'stop'],
  data() {
    return {
      secondsLeft: 0,
      hasLost: false,
    };
  },
  watch: {
    hasWon(newState) {
      if (newState) {
        clearInterval(interval);
        this.secondsLeft = 0;
      }
    },
  },
  methods: {
    handleStart() {
      this.$emit('start');
      this.secondsLeft = GAME_TIME;
      interval = setInterval(() => {
        if (this.secondsLeft > 1) {
          this.secondsLeft -= 1;
        }
        else {
          this.endGame();
          this.hasLost = true;
        }
      }, 1000);
    },
    endGame() {
      clearInterval(interval);
      this.secondsLeft = 0;
      this.$emit('stop');
    },
  },
};
</script>

<template>
  <section class="gameControls">
    <div class="btns">
      <button :disabled="isPlaying" @click="handleStart">
        Start
      </button>
      <button :disabled="!isPlaying" @click="endGame">
        Stop
      </button>
    </div>
  </section>

  <h1 v-if="hasWon">
    YEY YOU WON
  </h1>
  <h2 v-if="secondsLeft">
    Seconds left {{ secondsLeft }}
  </h2>
  <p v-if="hasLost">
    Hey, you lost the game!
  </p>
</template>

<style  scoped>
.gameControls{
    margin: 2rem 0;
}
.btns{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
</style>
