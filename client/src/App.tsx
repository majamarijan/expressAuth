import { Suspense } from 'react'
import Header from './components/Header';
import './App.css'
import { Button } from '@/components/ui/button';
import { Spinner } from './components/ui/spinner';
import Message from './components/Message';


function App() {
  return (
      <div className='min-h-full'>
        <Header />
        <h1>Hello from React app!</h1>
        <Suspense fallback={<Spinner />}>
        <p className='flex gap-2 items-center'>Message from server: <Message /></p>
        <Button>Test</Button>
        </Suspense>
      </div>
  )
}

export default App
