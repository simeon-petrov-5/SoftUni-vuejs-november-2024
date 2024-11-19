<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
      validator(value) {
        return value.includes('http');
      },
    },
    alt: {
      type: String,
      default: 'Image alt text',
    },
    isFlipped: Boolean,
    id: {
      type: Number,
      required: true,
    },
  },
  emits: ['flip'],
  methods: {
    onClick() {
      this.$emit('flip', this.id);
    },
  },
};
</script>

<template>
  <div
    class="card"
    @click="onClick"
  >
    <div class="card-inner" :class="{ 'is-flipped': isFlipped }">
      <div class="card-front">
        <img :src="url" :alt="alt">
      </div>
      <div class="card-back">
        <div class="card-pattern" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  aspect-ratio: 3/4;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-front {
  background-color: white;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.card-front img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.card-back {
  background-color: #2c3e50;
}

.card-pattern {
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0px,
    rgba(255, 255, 255, 0.1) 10px,
    transparent 10px,
    transparent 20px
  );
}

/* This class will be used later for card flipping logic */
.card-inner.is-flipped {
  transform: rotateY(180deg);
}
</style>
