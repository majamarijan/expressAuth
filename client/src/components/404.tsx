import { Link } from "@tanstack/react-router";

export default function ErrorComp() {
  return (
    <div className='min-h-[50vh] flex items-center border border-slate-300'>
      <div className="max-w-md mx-auto text-center">
        <h1 className='text-8xl'>404</h1>
        <p>Page not Found!</p>
        <Link to='/'>Back</Link>
      </div>
    </div>
  )
}