import { Link } from 'react-router-dom';
import { api } from './API';
import { useEffect, useState } from 'react';
import "./Quiz.css";

type Question = {
    word: string;
    choices: string[];
    correct: number;
};

export function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        api(`/questions?level=5&k=3`)
            .then(res => res.json())
            .then((data: Question[]) => {
                console.debug(data);
                setQuestions(data);
            });
    }, []);

    // 問題の取得に手こずっている場合
    if (questions.length === 0) {
        return <p>Loading...</p>;
    }

    const currentQ = questions[currentIndex];
    return (
        <div>
            <h3>
                問題 {currentIndex + 1} / {questions.length}
            </h3>

            <h2>{currentQ.word}</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {currentQ.choices.map((choice, i) => (
                    <li key={i}>
                        <button style={{ margin: "8px 0" }}>
                            {choice}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => {
                    setCurrentIndex((currentIndex + 1) % questions.length);
                }}
            >
                次へ
            </button>

            <Link to="/">
                <button className="back-button">戻る</button>
            </Link>
        </div>
    );
}
