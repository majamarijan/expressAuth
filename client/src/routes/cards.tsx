import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { useState } from 'react';


export const Route = createFileRoute('/cards')({
  component: Cards,
})


export default function Cards() {
  const [page, setPage] = useState(0);
  const {data, isPending, isError} = useQuery({
    queryKey: ['cards', page],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`);
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    }
   });
 
  return <div>Hello "/cards"!</div>
}

