import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const URL = "http://localhost:3000/pokemon"

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokeData: [],
      searchResult: ""
    }
  }

  componentDidMount() {
    fetch(URL)
    .then(r => r.json())
    .then(pokeData => {
      this.setState({ pokeData: pokeData })
    })
  }

  onSearchResult = (e, { value }) => {
    this.setState({searchResult: value})
  }

  filterPokemon = () => {
    return this.state.pokeData.filter(pokemon => pokemon.name.includes(this.state.searchResult))
  }

  handleSubmit = (e, pokemon) => {
    e.preventDefault()
    e.target.reset()
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: pokemon.name,
        stats: [{name: "hp", value: pokemon.hp}],
        sprites: {front: pokemon.frontUrl, back: pokemon.backUrl}
      })
    })
    .then(r => r.json())
    .then(pokemon => {
      this.setState({ pokeData: [...this.state.pokeData, pokemon] })
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleSubmit={this.handleSubmit}/>
        <br />
        <Search onSearchChange={_.debounce(this.onSearchResult, 500)} showNoResults={false} />
        <br />
        <PokemonCollection allPokemon={this.filterPokemon()}/>
      </div>
    )
  }
}

export default PokemonPage
