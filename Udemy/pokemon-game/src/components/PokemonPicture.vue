<template>
  <div class="pokemon-container">
    <img :src="imgSrc" alt=""
         class="hidden-pokemon">
    <img :src="imgSrc" alt="" v-if="showPokemon"
         class="fade-in">
  </div>
</template>

<script>
export default {
  name: "PokemonPicture",
  props: {
    pokemonId: {
      type: Number,
      required: true
    },
    showPokemon:{
      type:Boolean,
      required: true,
      default:false
    }
  },
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    }
  }
}
</script>

<style scoped>

.pokemon-container {
  height: 200px;
  display: flex;
  justify-content: center;
}

img {
  height: 200px;
  position: absolute;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

.hidden-pokemon {
  filter: brightness(0);
}
</style>
