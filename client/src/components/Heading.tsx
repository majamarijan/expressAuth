export default function Heading({ as, children }: { as:string,children: React.ReactNode }) {
  if(as === 'title') {
    return <h1 className='font-bold text-balance text-teal-800 dark:text-slate-200/90 text-shadow-sm dark:text-shadow-teal-200/80 capitalize text-4xl md:text-5xl lg:text-6xl tracking-wide'>{children}</h1>
  }
  if(as === 'h1') {
    return <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">{children}</h1>
  }
  if(as === 'h2') {
    return <h2 className="scroll-m-20 pb-2 text-3xl md:text-4xl text-balance font-semibold tracking-tight first:mt-0">{children}</h2>
  }
}
