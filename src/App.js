import React, { Component } from 'react';
import './App.css';
import Pokedex from 'pokedex-promise-v2'
const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cacheLimit: 200 * 1000,
  timeout: 20 * 1000
}
const P = new Pokedex(options);


function PokemonDataRender(props) {
  console.log('ini props', props.pokemon.sprites)
  return (
    props.pokemon.map((value, index) => (
      <div className="container">
        <img  src={value.sprites.front_default} alt="Avatar" className="image" />
        <div className="overlay">
          <div className="text">{value.name}</div>
        </div>
      </div>
    ))
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
    };
  }

  componentDidMount() {
    const interval = {
      limit: 19
    }
    P.getPokemonsList(interval)
      .then(async (response) => {
        for (let index = 0; index < response.results.length; index++) {
          P.resource(response.results[index]['url'])
            .then((response) => {
              this.setState({ results: [...this.state.results, response] })
            });
        }
      })
  }

  render() {
    console.log(this.state.results)
    return (
      <div className="App">
        {this.state.results[0] ? <PokemonDataRender pokemon={this.state.results} /> : null}
      </div>
    );
  }
}
