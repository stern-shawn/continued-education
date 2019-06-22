import React, { useState } from 'react'
import ReactDOM from 'react-dom'

interface AppProps {
  color?: string
}

const App = ({ color }: AppProps) => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <p>{counter}</p>
      <p>{color || 'Nah, no color'}</p>
    </div>
  )
}

ReactDOM.render(<App color="red" />, document.getElementById('root'))
