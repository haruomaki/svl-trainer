import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(1)

  function increment() {
    return setCount(c => c + c)
  }

  return (<>
    {/* カウンター */}
    <div className="card">
      <button onClick={increment}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  </>)
}

export default App
