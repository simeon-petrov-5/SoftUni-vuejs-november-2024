<script>
export default {
  emits: ['select'],
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Q0hUaUi7lLLC5UOslM9ul_B8NyXTKNn9BcBGtCXV&s"
            alt="logo"
          >
        </li>
      </ul>
      <ul>
        <li><a href="#" @click.prevent="$emit('select', 'Home')">Home</a></li>
        <li><a href="#" @click.prevent="$emit('select', 'Products')">Products</a></li>
        <li><a href="#" @click.prevent="$emit('select', 'About')">About</a></li>
        <li><a href="#" @click.prevent="$emit('select', 'Contacts')">Contacts</a></li>
        <li><a href="#" @click.prevent="$emit('select', 'Register')">Register</a></li>
        <li><a href="#" role="button" @click.prevent="$emit('select', 'Cart')">Cart</a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav {
  padding: 0.25rem 1rem;
}

nav img {
  height: 2rem;
}
</style>
