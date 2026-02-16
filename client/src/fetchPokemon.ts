export type PokemonListItem = {
  name: string;
  url: string;
}

export type PokemonData = {
  name: string;
  imageUrl: string;
  hp: [
    {
      base_stat: number
    }
  ];
  stats: [
    {
      base_stat: number,
      stat: {
        name: string,
      }
    }
  ],
  base_experience: number;
  description: string;
  id: number;
  types: [
    {
      type: {
        name: string
      }
    }
  ],
  sprites: {
    other: {
      "dream_world": {
        front_default: string
      }
    }
  }
}

export type PokemonInfo = {
  base_happiness: number;
  color: {
    name: string
  },
  flavor_text_entries: [{
    flavor_text: string,
  }],
  egg_groups: [{
    name: string
  }]
}

export async function fetchPokemonList(page:number) {
  console.log('fetching pokemon list');
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=8&offset=' + page * 8);
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  const listJson = await res.json();
  const pokemonList: PokemonListItem[] = listJson.results;
  return pokemonList;
}

export async function fetchPokemonDetails(p:PokemonListItem) {
  const id = p.url.split('/')[6];
  const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

  const detailsJson = await details.json();
  const speciesJson = await speciesRes.json();
    return {
      details:{
          name: detailsJson.name,
          imageUrl: detailsJson.sprites.other["dream_world"].front_default,
          stats: detailsJson.stats,
          base_experience: detailsJson.base_experience,
          id: detailsJson.id,
          sprites: detailsJson.sprites,
          ability: detailsJson.abilities[0].ability.name,
          gameIndex: detailsJson.game_indices[0].game_index,
          type: detailsJson.types[0].type.name
        },
          species: {
            base_happiness: speciesJson.base_happiness,
            color: speciesJson.color.name,
            flavor_text_entries: speciesJson.flavor_text_entries,
            egg: speciesJson.egg_groups.length > 0 ? speciesJson.egg_groups[speciesJson.egg_groups.length - 1].name : '',
            evolves_from: speciesJson.evolves_from_species
          }
        };
}

export async function fetchPokemonInfo(pokemonList: PokemonListItem[] | []) {
  if (pokemonList.length > 0) {
    return await Promise.all(
      pokemonList.map(async (p) => {
        const id = p.url.split('/')[6];
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        
        const speciesJson: PokemonInfo = await res.json();
        console.log(speciesJson.color.name)
        return {
          base_happinsess: speciesJson.base_happiness,
          color: speciesJson.color,
          flavor_text_entries: speciesJson.flavor_text_entries,
          egg_groups: speciesJson.egg_groups,
          id: p.name
        };
      })
    )
  }else {
    return [];
  }
}




