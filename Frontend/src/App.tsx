import { useState } from 'react'
import image from './assets/WhatsApp Image 2025-08-20 at 07.50.46.jpeg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       
        <a href="https://www.linkedin.com/in/mpho-modiba-477915292/" target="_blank">
          <img src={image} alt="Mpho's Image" width={700} height={1000} />
        </a>
      </div>
      <h1>Mpho Modiba</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Mpho is number: {count}
        </button>
       
      </div>
      <p className="read-the-docs">
        Click on the Mpho Image to learn more
      </p>
    </>
  )
}

export default App
