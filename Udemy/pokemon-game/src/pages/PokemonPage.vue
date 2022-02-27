<template>
  <h2>Quién es este pokemon?</h2>

  <PokemonPicture :pokemon-id="65" :showPokemon="false"></PokemonPicture>
  <PokemonOptions :pokemons="pokemons"></PokemonOptions>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonsOptions from "@/api/getPokemonOptions";

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemons: []
    }
  },
  components: {
    PokemonPicture,
    PokemonOptions
  },
  methods: {
    async getPokemons() {
      this.pokemons = await getPokemonsOptions();
    }
  },
  mounted() {
    this.getPokemons();
  }
}
</script>

<style scoped>

</style>
