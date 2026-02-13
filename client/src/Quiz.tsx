import { Link, useSearchParams } from 'react-router-dom';
import { api } from './API';
import { useEffect, useState } from 'react';
import "./Quiz.css";

type Question = {
    word: string;
    choices: string[];
    correct: number;
};

export function Quiz() {
    const [reloadCount, setReloadCount] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // クエリパラメータ取得
    const [searchParams] = useSearchParams();
    const level = Number(searchParams.get("level") ?? "6");
    const k = Number(searchParams.get("k") ?? "10");

    useEffect(() => {
        // タイトルの設定
        document.title = `レベル${level} - SVL Trainer`;

        // 問題の取得
        api(`/questions?level=${level}&k=${k}`)
            .then(res => res.json())
            .then((data: Question[]) => {
                console.debug(data);
                setQuestions(data);
                setCurrentIndex(0);
                setSelectedIndex(null);
            });
    }, [reloadCount, level, k]);

    // 問題の取得に手こずっている場合
    if (questions.length === 0) {
        return <p>Loading...</p>;
    }

    const currentQ = questions[currentIndex];
    return (<>
        <h3>
            問題 {currentIndex + 1} / {questions.length}
        </h3>

        <h2>{currentQ.word}</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
            {currentQ.choices.map((choice, i) => {
                let className = "";

                if (selectedIndex !== null) {
                    if (i === currentQ.correct) {
                        className += " correct";
                    } else if (i === selectedIndex) {
                        className += " wrong";
                    }
                };

                return (
                    // 一度クリックされると全てのボタンがdisableされ、緑や赤に色付けされる
                    <li key={i}>
                        <button className={className} onClick={() => setSelectedIndex(i)} disabled={selectedIndex !== null}>{choice}</button>
                    </li>
                )
            })}
        </ul>

        {(currentIndex < questions.length - 1) ?
            <button onClick={() => {
                // 次の問題へ進む
                setCurrentIndex(currentIndex + 1);
                setSelectedIndex(null);
            }}>
                次へ
            </button> :
            <button onClick={() => setReloadCount(c => c + 1)}>
                次の10問へ
            </button>
        }

        <Link to="/">
            <button className="back-button">戻る</button>
        </Link>
    </>);
}
