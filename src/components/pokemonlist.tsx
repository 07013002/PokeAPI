import { Component } from "react";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

interface PokemonListState {
  pokemons: Pokemon[];
}

class PokemonList extends Component<{}, PokemonListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  async componentDidMount() {
    try {
      const offset = 0; // Defina o offset desejado
      const limit = 10; // Defina o limite desejado

      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      const response = await fetch(url);
      const jsonBody = await response.json();
      const pokemons = jsonBody.results;

      // Mapeie os detalhes dos Pokémon e faça as solicitações
      const detailRequest = pokemons.map(this.getPokemonsDetail);
      const pokemonsDetail = await Promise.all(detailRequest);

      this.setState({ pokemons: pokemonsDetail });
    } catch (error) {
      console.error("Erro ao obter a lista de Pokémon:", error);
    }
  }

  async getPokemonsDetail(pokemon: { url: string }): Promise<Pokemon> {
    const response = await fetch(pokemon.url);
    const pokeDetail = await response.json();
    // Implemente a lógica de conversão aqui, com base no seu exemplo anterior
    return pokeDetail as Pokemon; // Substitua pelo objeto Pokémon convertido
  }

  render() {
    return (
      <div>
        <h1>Lista de Pokémon</h1>
        <ul>
          {this.state.pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              {/* Renderize os detalhes do Pokémon aqui */}
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
              {/* Adicione mais informações conforme necessário */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PokemonList;
