import { Link } from 'react-router-dom';
import { api } from './API';
import { useEffect, useState } from 'react';

type Question = {
    word: string;
    choices: [string];
    correct: number;
};

export function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        api(`/questions?level=5&k=3`)
            .then(res => res.json())
            .then((data: Question[]) => {
                setQuestions(data);
            });
    }, []); // ← 空にする

    return (
        <div>
            <p>こんにちは</p>

            <pre style={{ textAlign: "left" }}>{JSON.stringify(questions, null, 2)}</pre>

            <Link to="/">
                <button>戻る</button>
            </Link>
        </div>
    );
}
