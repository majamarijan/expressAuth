import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Suspense } from "react"
import { Skeleton } from "./ui/skeleton"
import Heading from "./Heading"



export type Suspended = {
  suspended?: boolean
}

export type PokemonCardProps = {
  name: string
  ability:string
  imageUrl: string
  hp: number
  attack: number
  description?: string
  id?: number
  color?:string
  base_experience?: number
  types?: [
    {
      type: {
        name: string
      }
    }
  ],
  egg?:string
  defence?: number
  gameIndex?: number
} 



 

export function PokemonCard({ name, imageUrl, hp, attack, id, color, egg, ability, defence, gameIndex}: PokemonCardProps) {
  const text = color === 'black' || 'blue' ? 'white' : 'black'
  return (
      <Card className={`relative w-40 h-62 rounded-xl border-4 shadow-lg overflow-hidden self-stretch grid grid-rows-[min-content_1fr_min-content] items-center justify-stretch animate-in duration-1000 fade-in-5 pb-0`}>
    <Badge variant="default" className="absolute w-12 rounded transform rotate-90 -left-3 z-20">{egg}</Badge>
      <div className="absolute inset-0 z-0 bg-stone-100/80 backdrop-blur-3xl"></div>
      <CardHeader style={{backgroundColor: color}} className={`absolute top-0 left-0 w-full py-2 px-1 text-center z-10`}>
        <CardTitle className="text-lg text-stone-900 font-bold uppercase tracking-wide">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center p-4 row-span-2 relative z-10">
        <div className="relative mb-3 w-26 h-26">
          <img
            src={imageUrl}
            alt={name}
            className="object-contain w-full h-full animate-in fade-in-10 duration-1000"
          />
        <Badge variant="secondary" className="w-12 rounded">HP: {hp}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-center text-sm font-semibold p-0 relative z-10">
        <div className="flex">
        <Badge variant="secondary" className="bg-red-800 rounded">⚔️{attack}</Badge>
        <Badge variant="outline" className="rounded outline-2 bg-teal-900">🛡️{defence}</Badge>
        <Badge variant="outline" className="rounded outline-2 bg-pink-900">🔺{gameIndex}</Badge>
        </div>
        <Badge variant="outline" className="text-stone-900 rounded outline-2 bg-stone-400 grow w-full">🌈{ability}</Badge>

      </CardFooter>
    </Card>
  )
}

