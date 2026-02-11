import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      <section className="bg-linear-to-r from-chart-3 via-red-500 to-pink-500 text-white py-20 relative">
        <svg className="absolute -top-1/2 left-0 transform -translate-y-18 z-0 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
					<linearGradient id="gradient-fill" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
						
							<stop offset="0" stop-color="#ff9100" />
						
							<stop offset="0.14285714285714285" stop-color="#ff9100" />
						
							<stop offset="0.2857142857142857" stop-color="#ff9100" />
						
							<stop offset="0.42857142857142855" stop-color="#fc611e" />
						
							<stop offset="0.5714285714285714" stop-color="#fc611e" />
						
							<stop offset="0.7142857142857143" stop-color="#fc611e" />
						
							<stop offset="0.8571428571428571" stop-color="#ff486e" />
						
							<stop offset="1" stop-color="#ff5990" />
						
					</linearGradient>
				</defs>
        <path fill="url(#gradient-fill)" fillOpacity="1" d="M0,224L40,218.7C80,213,160,203,240,197.3C320,192,400,192,480,202.7C560,213,640,235,720,229.3C800,224,880,192,960,202.7C1040,213,1120,267,1200,272C1280,277,1360,235,1400,213.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
        {" "}
        <div className="container mx-auto px-6 text-center relative z-10">
          <Heading as="h1">Catch, Collect & Trade Pokémon Cards</Heading>
          <p className="font-sans text-lg mb-8 max-w-2xl mx-auto">
            {" "}
            Build your dream collection and connect with trainers worldwide.
            Open packs, discover rare cards, and start your Pokémon adventure
            today.{" "}
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className='relative items-center flex flex-col max-h-fit outline-4 outline-stone-900 border-4 border-neutral-800 rounded-xl max-w-fit mx-auto bg-neutral-600'>
          <span className='absolute -left-4 -top-2 text-2xl rounded p-2 bg-red-800 font-mono'>🔥178</span>
          <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png'} alt="Charizard" className='w-full h-full object-contain max-w-sm col-start-2 relative z-4 aspect-auto' />
           <Card className="relative w-full max-w-sm mx-auto grid min-h-38 z-3 shadow-slate-300/70 items-end gap-2 bg-slate-900/90 backdrop-blur-2xl outline-4 outline-stone-800 outline-offset-2">
  
                    <CardHeader className='relative text-slate-200'>
                      <CardTitle className='uppercase tracking-widest text-2xl'>Charizard</CardTitle>
                    </CardHeader>
                    <CardFooter className='flex flex-row items-center justify-center flex-wrap text-neutral-400'>
                      <div className='flex items-start text-xs text-nowrap outline-1 rounded p-2 text-shadow-[2px_0px_0] text-shadow-black text-white'>
                        <span>⚔️<em>Speed</em></span>
                      </div>
                      <div className='flex items-start text-xs text-nowrap outline-1 rounded p-2 text-shadow-[2px_0px_0] text-shadow-black text-white'>
                        <span>👊fire-punch</span>
                      </div>
                      <div className='flex items-start text-xs text-nowrap outline-1 rounded p-2 text-shadow-[2px_0px_0] text-shadow-black text-white'>
                        <span>🌟<em>Blaze</em></span>
                      </div>
                      <div className='flex items-start text-xs text-nowrap outline-1 rounded p-2 text-shadow-[2px_0px_0] text-shadow-black text-white'>
                        <span>🔖<em>fire</em></span>
                      </div>
                    </CardFooter>
                  </Card>
        </div>
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-poppins text-4xl font-bold mb-4 text-indigo-600">
            {" "}
            Your Ultimate Card Library{" "}
          </h2>
          <p className="font-sans text-lg max-w-xl mx-auto text-gray-700">
            {" "}
            Track every card you own, from common Pokémon to legendary finds.
            Organize your sets, unlock achievements, and watch your collection
            grow.{" "}
          </p>
        </div>{" "}
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-poppins text-4xl font-bold mb-4 text-pink-600">
            Join the Pokémon Card Community
          </h2>
          <p className="font-sans text-lg max-w-xl mx-auto text-gray-700">
            Share your collection, showcase rare finds, and connect with fellow
            fans. Celebrate milestones together and become part of the
            adventure.
          </p>
        </div>
      </section>
    </div>
  );
}


function Info() {
  return (
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
  )
}