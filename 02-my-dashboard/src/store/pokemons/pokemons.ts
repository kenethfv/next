import { SimplePokemon } from '@/pokemons';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/*
  {
    '1': { id: 1, name: 'bulbasaur' },
    '2': { id: 2, name: 'charmander' }
  }
*/

interface PokemonsState {
    [key: string]: SimplePokemon
}

const initialState: PokemonsState = {
    // '1': { id: '1', name: 'bulbasaur' },
    // '4': { id: '4', name: 'charmander' },
    // '7': { id: '7', name: 'squirtle' },
    // '6': { id: '6', name: 'charizard' },
}

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    toggleFavorite( state, action: PayloadAction<SimplePokemon> ) {
      const pokemon = action.payload;
      const { id } = pokemon;

      if ( !!state[id] ) {
        delete state[id]
        return;
      }

      state[id] = pokemon
    }

  }
});

export const { toggleFavorite } = pokemonSlice.actions

export default pokemonSlice.reducer