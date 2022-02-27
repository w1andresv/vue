import pokemonApi from "@/api/pokemonApi";

const getPokemons = () => {
  const arry = Array.from(Array(650));
  return arry.map((_, index) => index + 1)
};
const getPokemonsName = async ([a, b, c, d] = []) => {
  const arr = [
    await pokemonApi.get(`/${a}`),
    await pokemonApi.get(`/${b}`),
    await pokemonApi.get(`/${c}`),
    await pokemonApi.get(`/${d}`),
  ]
  const [p1, p2, p3, p4] = await Promise.all(arr);
  return [
    {name: p1.data.name, id: p1.data.id},
    {name: p2.data.name, id: p2.data.id},
    {name: p3.data.name, id: p3.data.id},
    {name: p4.data.name, id: p4.data.id},
  ]


};
const getPokemonsOptions = async () => {
  const mixedPokemos = getPokemons().sort(() => Math.random() - 0.5);
  return await getPokemonsName(mixedPokemos.splice(0, 4));
};

export default getPokemonsOptions;
