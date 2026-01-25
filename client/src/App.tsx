import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(1);

  const handleDirect = () => {
    setCount(count + count); // 1回目: countは1 → 1+1=2
    setCount(count + count); // 2回目: 同じくcountは1 → 2
    setCount(count + count); // 3回目: 同じくcountは1 → 2
    // 結果、countは2になる（8にはならない）
  };

  const handleUpdater = () => {
    setCount(c => c + c); // 1 → 2
    setCount(c => c + c); // 2 → 4
    setCount(c => c + c); // 4 → 8
    // 結果、countは8になる
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleDirect}>直接更新（count + count）を3回</button>
      <br />
      <button onClick={handleUpdater}>更新関数（c =&gt; c + c）を3回</button>
    </div>
  );
}
