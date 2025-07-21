import { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMultiplePokemonById } from './RTK/thunk'

function App() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.pokemon)

  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151))
  }, [])

  return (
    <div>
      <h1>포켓몬 도감</h1>
      {loading && <p>불러오는 중...</p>}
      <div className="grid-container">
        {data.map((pokemon) => (
          <div key={pokemon.id} className="card">
            <h2>{pokemon.id}. {pokemon.name}</h2>
            <img src={pokemon.front} alt={pokemon.name} />
            <p>{pokemon.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
