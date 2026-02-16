import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalFetchingIndicator from "@/components/GlobalFetchingIndicator";
import { PokemonCard } from "@/components/PokeCard";
import { TabsLine } from "@/components/Tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { fetchPokemonDetails, fetchPokemonList, type PokemonListItem } from "@/fetchPokemon"
import { Button } from "@base-ui/react";
import { keepPreviousData, queryOptions, useQueries, useQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, ErrorComponent, Link, useLoaderData, useNavigate, useParams } from "@tanstack/react-router"
import { Suspense, useState } from "react";

const pokemonQuery = (page:number) => ({
  queryKey: ['pokemons', page],
  queryFn: ()=> fetchPokemonList(page),
  keepPreviousData: true
});

const pokemonDetailsQuery = (data:PokemonListItem[])=> {
  return {
    queries: data.map(p=> (
      {
        queryKey: ['pokemonDetails', p.name],
        queryFn: ()=> fetchPokemonDetails(p),
        keepPreviousData: true
      }
    ))
  }
}


export const Route = createFileRoute('/pokemons/')({
 loader: ({context: {queryClient}})=> queryClient.ensureQueryData(pokemonQuery(0)),
  component: Pokemons,
})

export default function Pokemons() {
  const [page, setPage] = useState(0);
  const { data, status, isLoading, isFetching, error} = useQuery(pokemonQuery(page));


  return (
    <section className="min-h-[50vh] flex flex-col gap-8 items-center">

  <h1>POKEMONS</h1>
      <TabsLine />
      <div className="flex flex-col items-center justify-center min-h-[50vh] h-[80vh]">
        {/* {isFetching && <Spinner className="w-24 h-24" />} */}
        <ErrorBoundary fallback={<h1>Error</h1>}>
        <Suspense fallback={<SuspenseGrid ln={8} />}>
          <PokemonList list={data || []} />
          </Suspense>
          </ErrorBoundary>
        
      </div>
          <div className="flex flex-row flex-wrap gap-2">
            <Button  onClick={()=> setPage(page-1)} disabled={page === 0} className={`disabled:grayscale`}>Previous</Button>
            <Button  onClick={()=> setPage(page+1)}>Next</Button>
          </div>
    </section>
  )
}

function SuspenseGrid({ln}: {ln: number}) {
  return (
    <div className='flex flex-wrap gap-4 items-center justify-center'>
      {[...Array(ln)].map((_, i) => (
        <Skeleton key={i} className="w-50 h-70 fade-out animate-pulse" />
      ))}
    </div>
  )
}

function PokemonList({list}:{list:PokemonListItem[]}) {
const pokemonDetails = useSuspenseQueries(pokemonDetailsQuery(list || []));
  return (
     <div className="flex flex-wrap justify-center gap-4 items-center duration-700">
       {pokemonDetails.map((dt) => {
         const pokemon = dt.data.details;
         const species = dt.data.species;
         return (
         <PokemonCard
          key={pokemon.name}
           name={pokemon.name}
           imageUrl={pokemon.sprites.other["dream_world"].front_default}
           hp={pokemon.stats[0].base_stat}
           attack={pokemon.base_experience}
           id={pokemon.id}
           color={species.color}
         />
         )
       })}
     </div>
    
  )
}