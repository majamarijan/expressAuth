// import { createFileRoute } from '@tanstack/react-router'
// import { useQueries, useQuery, useSuspenseQuery } from '@tanstack/react-query'
// import { useState } from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { PokemonCard, type PokemonCardProps } from '@/components/PokeCard';
// import {fetchPokemonList, fetchPokemonDetails, type PokemonData, type PokemonListItem, fetchPokemonInfo} from '../fetchPokemon.ts'

// const pokemonQueryOptions = (page: number) => ({
//   queryKey: ['pokemon', page],
//   queryFn: () => fetchPokemonList(page),
// })
// const detailsQueryOptions = (pokemonList: PokemonListItem[]) => ({
//   queryKey: ['pokemonDetails', pokemonList],
//   queryFn: () => fetchPokemonDetails(pokemonList),
// })
// const infoQueryOptions = (pokemonList: PokemonListItem[]) => ({
//   queryKey: ['pokemonInfo', pokemonList],
//   queryFn: () => fetchPokemonInfo(pokemonList),
// })

// export const Route = createFileRoute('/cards')({
//   loader: ()=> [pokemonQueryOptions(0), detailsQueryOptions([]), infoQueryOptions([])],
//   component: Cards,
// })


// export default function Cards() {
//   const [page, setPage] = useState(0);
//   const {data: pokemonList, isLoading, isFetching} = useQuery<PokemonListItem[]>(pokemonQueryOptions(page));
//   const {data: pokemonDetails, isLoading: isLoadingDetails} = useQuery(detailsQueryOptions(pokemonList || []));
//   const {data: pokemonInfo, isLoading: isLoadingInfo} = useQuery(infoQueryOptions(pokemonList || []));
  
//   if(isFetching) return <Skeleton className="w-72 h-72" />

//   if (!pokemonList || !pokemonDetails || !pokemonInfo) {
//     return <Skeleton className="w-72 h-72" />
//   }

//   if (isLoading || isLoadingDetails || isLoadingInfo) {
//     return <Skeleton className="w-72 h-72" />
//   }


  
    
//     return (
//       <div>
//         <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 items-center justify-center place-items-center'>
//           {pokemonList.map((pokemon: PokemonListItem) => (
//             <PokemonCard
//               key={pokemon.name}
//               name={pokemon.name}
//               imageUrl={pokemonDetails?.find((p) => p.name === pokemon.name)?.sprites.other["dream_world"].front_default as string}
//               hp={pokemonDetails?.find((p) => p.name === pokemon.name)?.stats[0].base_stat as number}
//               attack={pokemonDetails?.find((p) => p.name === pokemon.name)?.base_experience as number}
//               id={pokemonDetails?.find((p) => p.name === pokemon.name)?.id}
//               types={pokemonDetails?.find((p) => p.name === pokemon.name)?.types}
//               description={pokemonInfo?.find((p) => p.id === pokemon.name)?.flavor_text_entries[0].flavor_text as string}
//               egg_groups={pokemonInfo?.find((p) => p.id === pokemon.name)?.egg_groups}
//               color={pokemonInfo?.find((p) => p.id === pokemon.name)?.color.name as string}
//               base_happinsess={pokemonInfo?.find((p) => p.id === pokemon.name)?.base_happinsess}
//             />
//           ))}
//         </div>
//           <button onClick={() => setPage(page - 1)} className={`disabled:opacity-50`} disabled={page === 0}>Previous</button>
//           <button onClick={() => setPage(page + 1)}>Next</button>
//       </div>
//     )

  
 
// }

