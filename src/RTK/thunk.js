import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (maxPokemonId) => {
    const numberArray = Array.from({ length: maxPokemonId }, (_, i) => i + 1)

    const fetchAPI = async (pokemonId) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      const data = await response.json()

      const koreanName = data.names.find(el => el.language.name === 'ko')?.name || '이름 없음'
      const koreanDesc = data.flavor_text_entries.find(el => el.language.name === 'ko')?.flavor_text || '설명 없음'

      return {
        id: pokemonId,
        name: koreanName,
        description: koreanDesc.replace(/\n|\f/g, ' '), // 보기 좋게 공백 정리
        front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`,
      }
    }

    return await Promise.all(numberArray.map(fetchAPI))
  }
)
