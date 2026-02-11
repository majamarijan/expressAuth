import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

type PokemonCardProps = {
  name: string
  imageUrl: string
  hp: number
  attack: number
  description: string
}

export function PokemonCard({ name, imageUrl, hp, attack, description }: PokemonCardProps) {
  return (
    <Card className="w-72 rounded-xl border-4 border-yellow-400 shadow-lg overflow-hidden bg-slate-200 text-foreground">
      <CardHeader className="bg-yellow-200  text-center">
        <CardTitle className="text-lg text-stone-900 font-bold uppercase tracking-wide">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center p-4">
        <div className="relative w-40 h-40 mb-3">
          <img
            src={imageUrl}
            alt={name}
            className="object-contain"
          />
        </div>
        <p className="text-sm text-gray-700 text-center tracking-wide">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between text-sm font-semibold bg-yellow-100 text-stone-900 px-4 py-2">
        <span>HP: {hp}</span>
        <span>⚡ Attack: {attack}</span>
      </CardFooter>
    </Card>
  )
}
