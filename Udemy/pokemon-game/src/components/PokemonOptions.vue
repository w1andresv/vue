<template>
  <h3>Pokemon options</h3>
  <div class="options-container">
    <ul>
      <li v-for="item in pokemons" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PokemonOptions",
  props:{
    pokemons:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped>
/* Pokemon Options */
ul {
  list-style-type: none;
}

li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
