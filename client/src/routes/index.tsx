import Hero from '@/components/Hero';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

async function getMessage(): Promise<{message: string}> {
  const res = await fetch('http://localhost:4000/api/hello', {credentials: 'include'});
  if(!res.ok) {
    throw new Error(res.statusText);
  }
  await new Promise(r=> setTimeout(r, 1000));
  return res.json();
}

const queryData = {
      queryKey: ['message'],
      queryFn: getMessage
    }

export const Route = createFileRoute('/')({
  loader: ({context: {queryClient}}) => 
    queryClient.ensureQueryData(queryData),
  component: Home,
})

function Home() {
  const {data, isLoading} = useSuspenseQuery(queryData);
  return (
    <div className="p-2">
      <Hero />
      {isLoading && <Spinner />}
      {data && <p>{data.message}</p>}
    </div>
  )
}