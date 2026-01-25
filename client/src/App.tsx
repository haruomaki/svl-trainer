import { useState } from 'react'
import './App.css'

type Word = {
  en: string
  ja: string
}

const words: Word[] = [
  { en: 'apple', ja: 'りんご' },
  { en: 'run', ja: '走る' },
  { en: 'book', ja: '本' },
]

export default function App() {
  // 今出題している単語の index
  const [index, setIndex] = useState(0)

  // 日本語を表示するかどうか
  const [showAnswer, setShowAnswer] = useState(false)

  const current = words[index]

  function nextWord() {
    setIndex(i => (i + 1) % words.length)
    setShowAnswer(false)
  }

  return (
    <div className="card">
      <h2>{current.en}</h2>

      {showAnswer && <p>{current.ja}</p>}

      <button onClick={() => setShowAnswer(true)}>
        答えを見る
      </button>

      <button onClick={nextWord}>
        次の単語
      </button>
    </div>
  )
}
