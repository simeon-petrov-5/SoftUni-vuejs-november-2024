<script>
const INPUT_LIMIT = 10;

const getTheLimit = () => INPUT_LIMIT;

export default {
  data() {
    return {
      rangeVariable: 15,
      isDay: true,
      cartProducts: [
        { id: 1, name: 'Smartphone', price: 499.99, quantity: 2 },
        { id: 2, name: 'Laptop', price: 999.99, quantity: 1 },
        { id: 3, name: 'Headphones', price: 79.99, quantity: 3 },
        { id: 4, name: 'Tablet', price: 299.99, quantity: 2 },
      ],
      inventory: [
        {
          id: 1,
          name: 'Electronics',
          products: [
            { id: 1, name: 'Smartphone', price: 499.99, quantity: 2 },
            { id: 2, name: 'Laptop', price: 999.99, quantity: 1 },
          ],
        },
        {
          id: 2,
          name: 'Audio',
          products: [
            { id: 3, name: 'Headphones', price: 79.99, quantity: 3 },
          ],
        },
      ],
      bookInfo: {
        title: 'The Magical Adventure',
        author: 'John Smith',
        genre: 'Fantasy',
        publishedAt: '2023-07-15',
        pages: 320,
        rating: '★★★★☆',
      },
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery',
        ],
      },
      inputValue: '',
    };
  },
  computed: {
    hasBooks() {
      return this.author.books.length > 0 ? 'Yes' : 'No';
    },
    hasReachedLimit() {
      return this.inputValue.length > getTheLimit();
    },
  },
  watch: {
    inputValue: {
      handler(newValue, oldValue) {
        console.log('INPUT WATCHER', newValue, oldValue);
      },
      deep: true,
    },
  },
  methods: {
    onDayChange() {
      this.isDay = !this.isDay;
    },
    /**
     * @param time AM | PM
     */
    changeTime(time, eventObj) {
      console.log('changeTime', eventObj);
      if (time === 'AM') {
        this.isDay = true;
      }
      else if (time === 'PM') {
        this.isDay = false;
      }
    },
    onBtnClick() {
      console.log('BTN WAS CLICKED');
    },
    onInputChange(inputEvent) {
      if (this.hasReachedLimit)
        return;

      this.inputValue = inputEvent.target.value;
    },
  },
};
</script>

<template>
  <h1>Hello world</h1>
  <h2 v-if="isDay">
    ☀️ It's sunny outside!
  </h2>
  <h2 v-else>
    🌑 It's dark outside!
  </h2>

  <template v-if="isDay">
    <p>
      🎉 Welcome to My Awesome Page 🎉
    </p>
    <span>
      👋 Hello there! This is a cool Vue.js example.
    </span>
  </template>

  <p v-else>
    Click the button above to reveal the exciting content! 😄
  </p>

  <button @click="onDayChange">
    Toggle time
  </button>

  <button @click="changeTime('AM', $event)">
    Set to AM
  </button>
  <button @click="changeTime('PM', $event)">
    Set to PM
  </button>

  <h2 v-show="!isDay">
    ☀️THIS SHOULD BE HIDDEN WHEN IT'S A DAY ☀️
  </h2>

  <h2>My products</h2>
  <ul>
    <li v-for="(product, idx) in cartProducts" :key="`product-${idx}`">
      {{ `${product.name} ${product.price}` }}
      x {{ product.quantity }}
      <input type="text">
    </li>
  </ul>

  <!-- <article>
    <template v-for="(product, idx) in cartProducts" :key="`product-${idx}`">
      <h2>{{ product.name }}</h2>
      <p>{{ product.price }}</p>
      <span>      x {{ product.quantity }}</span>
    </template>
  </article> -->

  <h2>Products & categories</h2>
  <ul>
    <li v-for="category in inventory" :key="`category-${category.id}`">
      <article>
        <h3>{{ category.name }}</h3>
        <ol>
          <li v-for="prod in category.products" :key="`prod-${prod.id}`">
            <p>{{ prod.name }} x {{ prod.quantity }}</p>
          </li>
        </ol>
      </article>
    </li>
  </ul>

  <h2>My book</h2>

  <article>
    <p v-for="(value, key) in bookInfo" :key="`book-${value}`">
      <span>{{ key }}</span>: {{ value }}
    </p>
  </article>

  <!-- <ul>
    <li v-for="number in rangeVariable">
      {{ number }}
    </li>
  </ul> -->

  <p>Has published books: <span> {{ hasBooks }}</span></p>

  <a href="http://google.com" @click.prevent="() => console.log('test')">Go to google</a>

  <button @click.ctrl.exact="onBtnClick">
    Event modifiers
  </button>

  <article>
    <h2>Search field</h2>
    <input type="text" @input="onInputChange">

    <p v-if="hasReachedLimit">
      🛑 Limit was reached!
    </p>
  </article>
</template>
