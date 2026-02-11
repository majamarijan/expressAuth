import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PokemonCard } from "@/components/PokeCard";
import Section from "@/components/Section";

// async function getMessage(): Promise<{message: string}> {
//   const res = await fetch('http://localhost:4000/api/hello', {credentials: 'include'});
//   if(!res.ok) {
//     throw new Error(res.statusText);
//   }
//   await new Promise(r=> setTimeout(r, 1000));
//   return res.json();
// }

// const queryData = {
//       queryKey: ['message'],
//       queryFn: getMessage
//     }

export const Route = createFileRoute("/")({
  // loader: ({context: {queryClient}}) =>
  //   queryClient.ensureQueryData(queryData),
  component: Home,
});

function Home() {
  // const {data, isLoading} = useSuspenseQuery(queryData);
  return (
    <div className="p-0 md:p-2">
      <Hero />
      <Section className="bg-pink-800 text-white">
<svg
    className="absolute top-0 left-0 w-full h-24"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="var(--background)"
      d="M0,64L48,90.7C96,117,192,171,288,186.7C384,203,480,181,576,170.7C672,160,768,160,864,165.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,0L0,0Z"
    ></path>
  </svg>
        <svg
    className="absolute bottom-0 left-0 w-full h-24"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#f9fafb"
      d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,117.3C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L0,320Z"
    ></path>
  </svg>
        <div className="text-center">
          <Heading as="h1">Catch, Collect & Trade Pokémon Cards</Heading>
          <p className="font-sans text-lg mb-8 max-w-2xl mx-auto">
           
            Build your dream collection and connect with trainers worldwide.
            Open packs, discover rare cards, and start your Pokémon adventure
            today.
          </p>
        </div>
      </Section>

      <Section type='multiple' className="bg-gray-50">
        <div className="px-8 py-8 text-center lg:text-left max-w-lg">
          <h2 className="text-4xl font-bold text-chart-2">
            Your Ultimate Card Library
          </h2>
          <p className="font-sans text-lg text-gray-700">
            Track every card you own, from common Pokémon to legendary finds.
            Organize your sets, unlock achievements, and watch your collection
            grow.
          </p>
        </div>
        <PokemonCard name='Hornet' imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png" hp={80} attack={150} description="A swift creature with electric powers. Known for its agility and sharp instincts." />
      </Section>
     
      <Section className="bg-secondary">
<div className="container mx-auto px-6 text-center">
          <h2 className="font-poppins text-4xl font-bold mb-4 text-pink-600">
            Join the Pokémon Card Community
          </h2>
          <p className="font-sans text-lg max-w-xl mx-auto text-chart-2">
            Share your collection, showcase rare finds, and connect with fellow
            fans. Celebrate milestones together and become part of the
            adventure.
          </p>
          <Button className="mt-8 w-80 h-12">Join Now</Button>
        </div>
      </Section>
    </div>
  );
}