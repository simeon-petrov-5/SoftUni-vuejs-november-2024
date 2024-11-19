<template>
  <article>
    <slot name="header">
      <header>
        <h1>Default slot header</h1>
      </header>
    </slot>

    <section>
      <slot>
        <h1>This is a default slot's value</h1>
      </slot>
    </section>

    <slot name="footer">
      <footer>
        <i>Default slot footer</i>
      </footer>
    </slot>
  </article>
</template>
