import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

async function getMessage(): Promise<{message: string}> {
  const res = await fetch('http://localhost:4000/api/hello', {credentials: 'include'});
  if(!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export default function Message() {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['message'],
    queryFn: getMessage
  });

  if(isLoading) return <Spinner />;
  if(isError) return <p>Error: {error.message}</p>;
  return <span>{data?.message}</span>;
}