import { useState, useEffect, Suspense } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('');
  useEffect(()=> {
    setTimeout(() => {
      fetch('http://localhost:4000/api/hello', {credentials: 'include'}).then(res=> res.json()).then(res=> setMessage(res.message));
    }, 1000);
  },[]);

  return (
    <>
      <div>
        <h1>Hello from React app!</h1>
        <Suspense fallback={<p>Loading...</p>}>
        <p>Message from server: {message ? message : 'Loading...'}</p>
        </Suspense>
      </div>
    </>
  )
}

export default App
