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
    <section className="min-h-[50vh] flex flex-col items-center">

  <h1>POKEMONS</h1>
      <TabsLine />
      <div className="flex flex-col items-center justify-center py-4">
        {/* {isFetching && <Spinner className="w-24 h-24" />} */}
        <ErrorBoundary fallback={<h1>Error</h1>}>
        <div className="flex flex-wrap md:grid md:grid-cols-4 justify-center gap-4 items-center duration-700">
        <Suspense fallback={<SuspenseGrid ln={8} />}>
          <PokemonList list={data || []} />
          </Suspense>
        </div>
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
    <>
      {[...Array(ln)].map((_, i) => (
        <Skeleton key={i} className="w-40 h-62 fade-out animate-pulse" />
      ))}
    </>
  )
}

function PokemonList({list}:{list:PokemonListItem[]}) {
const pokemonDetails = useSuspenseQueries(pokemonDetailsQuery(list || []));
  return (
     <>
       {pokemonDetails.map((dt) => {
         const pokemon = dt.data.details;
         const species = dt.data.species;
         return (
         <PokemonCard
          key={pokemon.name}
           name={pokemon.name}
           imageUrl={pokemon.sprites.other["dream_world"].front_default}
           hp={pokemon.stats[0].base_stat}
           attack={pokemon.stats[1].base_stat}
           defence={pokemon.stats[2].base_stat}
           id={pokemon.id}
           color={species.color}
           egg={species.egg}
           ability={pokemon.ability}
           gameIndex={pokemon.gameIndex}
         />
         )
       })}
     </>
    
  )
}