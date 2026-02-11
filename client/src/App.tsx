import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import { Mondai } from './mondai';

// 環境変数でAPIベースURLを定義
const API = import.meta.env.VITE_API || 'https://api.haruomaki.jp/svl-trainer';

type Word = {
  en: string
  ja: string
}

type LearningStatus = 'new' | 'correct' | 'wrong'

type WordStatus = {
  word_id: string
  learning_status: LearningStatus
  user_flag: string | null
}

const words: Word[] = [
  { en: 'apple', ja: 'りんご' },
  { en: 'run', ja: '走る' },
  { en: 'book', ja: '本' },
]

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/quiz" element={<Mondai />} />
      </Routes>
    </Router>
  );
}

export function Title() {
  const [index, setIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [wordStatus, setWordStatus] = useState<WordStatus | null>(null)

  const current = words[index]

  useEffect(() => {
    fetch(`${API}/word-status/${current.en}`)
      .then(res => res.json())
      .then((data: WordStatus) => {
        setWordStatus(data)
      })
  }, [current.en])

  function saveStatus(status: LearningStatus) {
    const payload: WordStatus = {
      word_id: current.en,
      learning_status: status,
      user_flag: wordStatus?.user_flag ?? null,
    }

    fetch(`${API}/word-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(() => {
      setWordStatus(payload)
    })
  }

  function nextWord() {
    setIndex(i => (i + 1) % words.length)
    setShowAnswer(false)
  }

  return (
    <div className="card">
      <h2>{current.en}</h2>

      {showAnswer && <p>{current.ja}</p>}

      <p>状態: {wordStatus?.learning_status}</p>

      <button onClick={() => setShowAnswer(true)}>
        答えを見る
      </button>

      <button onClick={() => saveStatus('correct')}>
        正解
      </button>

      <button onClick={() => saveStatus('wrong')}>
        不正解
      </button>

      <button onClick={nextWord}>
        次の単語
      </button>

      <Link to="/quiz">
        <button>
          シーンチェンジ
        </button>
      </Link>
    </div>
  )
}
