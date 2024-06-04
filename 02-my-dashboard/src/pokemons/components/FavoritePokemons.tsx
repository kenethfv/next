"use client"

import { useAppSelector } from "@/store"
import { PokemonGrid } from "./pokemonGrid"
import { useState } from "react"
import { IoHeartOutline } from "react-icons/io5"

export const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.pokemons)
  )

  const [pokemons, setPokemons] = useState(favoritePokemons)

  return (
    <>
      {pokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <PokemonGrid pokemons={pokemons} />
      )}
    </>
    // <PokemonGrid pokemons={ favoritePokemons } />
    // <PokemonGrid pokemons={ pokemons } />
  )
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay Favoritos</span>
    </div>
  )
}
