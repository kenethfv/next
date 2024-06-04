import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";


export const metadata = {
 title: '151 Pokémons',
 description: '151 Pokémons',
};

const getPokemons = async( limit = 151, offset = 0): Promise<SimplePokemon[]> => {
    const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`)
    .then( res => res.json() )

    const pokemons = data.results.map( pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name,
    }) )

    return pokemons;
}

export default async function PokemonsPage() {

  const pokemons = await getPokemons()
  return (
    <div className="flex flex-col">
      <span className="text-5xl mr-2">Listado de Pokémons <small className="text-blue-500">estático</small></span>
      <PokemonGrid pokemons={ pokemons } />
    </div>
  );
}