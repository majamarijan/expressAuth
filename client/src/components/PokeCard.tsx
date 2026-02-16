import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"



export type Suspended = {
  suspended?: boolean
}

export type PokemonCardProps = {
  name: string
  imageUrl: string
  hp: number
  attack: number
  description?: string
  id?: number
  color?:string
  base_experience?: number,
  types?: [
    {
      type: {
        name: string
      }
    }
  ],
  egg_groups?: [
    {
      name: string
    }
  ],
  base_happinsess?: number
} 



 

export function PokemonCard({ name, imageUrl, hp, attack, id, color }: PokemonCardProps) {
  const text = color === 'black' || 'blue' ? 'white' : 'black'
  return (
    <Card className={`relative w-50 h-78 rounded-xl border-4 shadow-lg overflow-hidden bg-slate-200 self-stretch grid grid-rows-[min-content_1fr_min-content] items-center justify-center animate-in duration-1000  fade-in-5`}>
      <div style={{background: color}} className="absolute inset-0 z-0"></div>
      <CardHeader className={`absolute top-0 left-0 w-full py-2 text-center z-10`}>
        <CardTitle className="text-lg text-stone-900 font-bold uppercase tracking-wide">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center p-4 row-span-2 relative z-10">
        <div className="relative mb-3 w-32 h-32">
          <img
            src={imageUrl}
            alt={name}
            className="object-contain w-full h-full"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between text-sm font-semibold bg-yellow-100 text-stone-900 px-4 py-2 relative z-10">
        <span>HP: {hp}</span>
        <span>⚡ Attack: {attack}</span>
      </CardFooter>
    </Card>
  )
}


