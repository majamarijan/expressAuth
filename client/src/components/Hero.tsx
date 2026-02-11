import Heading from './Heading'
import { Button } from './ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'

export default function Hero() {
  return (
    <div className='relative grid place-items-center lg:place-items-start grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 items-center max-w-5xl mx-auto min-h-[50vh]'>
      <div className='relative z-10 max-w-lg place-self-center lg:text-left'>
        <Heading as="title" className='bg-linear-to-r from-chart-3 to-chart-1 bg-clip-text text-transparent'>Get your own Pokemon Cards!</Heading>
        <p className='pb-8'>The best place for your Pokemon collection. </p>
       <Button className='hidden lg:flex'>Get Started</Button>
      </div>
      <div className='flex justify-center scale-85 relative z-1 border items-center bg-accent rounded mt-8 place-self-center'>
      <Card className="relative w-full grid min-h-38 transform -rotate-12 z-12 hover:shadow-xl shadow-slate-300/70 items-end gap-2">
      <div className='relative w-full aspect-video'>
        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'} alt="Charizard" className='w-full h-full object-contain absolute left-0 -top-14 scale-200' />
        </div>
        <CardHeader className='relative'>
          <span className='absolute left-2 -top-8 text-2xl'>🔥178</span>
          <CardTitle className='uppercase'>Charizard</CardTitle>
        </CardHeader>
        <CardFooter className='flex justify-between items-center'>
          <div className='flex flex-col items-start text-xs text-nowrap'>
            <span>⚔️<em>Speed</em></span>
            <span>👊 fire-punch</span>
            <span>🌟<em>Blaze</em></span>
          </div>
        </CardFooter>
      </Card>
      <Card className="relative w-full grid min-h-38 transform -rotate-12 z-12 hover:shadow-xl shadow-slate-300/70 items-end gap-2">
      <div className='relative w-full aspect-video'>
        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png'} alt="Charizard" className='w-full h-full object-contain absolute left-0 -top-14 -translate-3 scale-200' />
        </div>
       <CardHeader className='relative'>
          <span className='absolute left-2 -top-8 text-2xl'>🔥178</span>
          <CardTitle className='uppercase'>Charizard</CardTitle>
        </CardHeader>
        <CardFooter className='flex justify-between items-center'>
          <div className='flex flex-col items-start text-xs text-nowrap'>
            <span>⚔️<em>Speed</em></span>
            <span>👊 fire-punch</span>
            <span>🌟<em>Blaze</em></span>
          </div>
        </CardFooter>
      </Card>
       <Card className="relative w-full min-h-38 transform -rotate-12 z-12 hover:shadow-xl shadow-slate-300/70 items-end gap-2 hidden sm:grid">
      <div className='relative w-full aspect-video'>
        <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png'} alt="Charizard" className='w-full h-full object-contain absolute left-0 -top-14 scale-200' />
        </div>
        <CardHeader className='relative'>
          <span className='absolute left-2 -top-8 text-2xl'>🔥178</span>
          <CardTitle className='uppercase'>Charizard</CardTitle>
        </CardHeader>
        <CardFooter className='flex justify-between items-center'>
          <div className='flex flex-col items-start text-xs text-nowrap'>
            <span>⚔️<em>Speed</em></span>
            <span>👊 fire-punch</span>
            <span>🌟<em>Blaze</em></span>
          </div>
        </CardFooter>
      </Card>
      </div>
      <Button className='lg:hidden place-self-center'>Get Started</Button>
    </div>
  )
}

