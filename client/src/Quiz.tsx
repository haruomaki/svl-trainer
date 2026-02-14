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
    // クエリパラメータ取得
    const [searchParams] = useSearchParams();
    const level = Number(searchParams.get("level") ?? "6");
    const k = Number(searchParams.get("k") ?? "10");

    // 状態
    const [reloadCount, setReloadCount] = useState(0); // 次の10問に移るときのリロード用
    const [questions, setQuestions] = useState<Question[]>([]); // 問題10問
    const [currentIndex, setCurrentIndex] = useState(0); // 今表示している設問番号
    const [answers, setAnswers] = useState<(number | null)[]>([]); // ユーザの解答記録

    // 変数の取得&更新ユーティリティ
    const currentQ = questions[currentIndex];
    const answer = answers[currentIndex];
    function setAnswer(value: number) {
        setAnswers(prev => {
            const next = [...prev];
            next[currentIndex] = value;
            return next;
        });
    }

    // 1. 初回表示時
    // 2. 次の10問へ移るとき
    // 3. クエリパラメータ更新時
    useEffect(() => {
        // タイトルの設定
        document.title = `レベル${level} - SVL Trainer`;

        // 問題の取得
        api(`/questions?level=${level}&k=${k}`)
            .then(res => res.json())
            .then((data: Question[]) => {
                console.debug("問題を取得", data);
                setQuestions(data);
                setCurrentIndex(0);
                setAnswers(new Array(k).fill(null));
            });
    }, [reloadCount, level, k]);

    // 問題の取得が終わるまでローディング画面
    if (questions.length === 0) {
        return <p>Loading...</p>;
    }

    return (<>
        <h3>
            問題 {currentIndex + 1} / {questions.length}
        </h3>

        <h2>{currentQ.word}</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
            {currentQ.choices.map((choice, i) => {
                let className = "";

                if (answer !== null) {
                    if (i === currentQ.correct) {
                        className += " correct";
                    } else if (i === answer) {
                        className += " wrong";
                    }
                };

                return (
                    // 一度クリックされると全てのボタンがdisableされ、緑や赤に色付けされる
                    <li key={i}>
                        <button className={className} onClick={() => setAnswer(i)} disabled={answer !== null}>{choice}</button>
                    </li>
                )
            })}
        </ul>

        <button className="navi-button" onClick={() => {
            // 前の問題に戻る
            setCurrentIndex(currentIndex - 1);
        }} disabled={currentIndex == 0}>
            前へ
        </button>

        {(currentIndex < questions.length - 1) ?
            <button className="navi-button" onClick={() => {
                // 次の問題へ進む
                setCurrentIndex(currentIndex + 1);
            }}>
                次へ
            </button> :
            <button className="navi-button" onClick={() => setReloadCount(c => c + 1)}>
                次の10問へ
            </button>
        }

        <Link to="/">
            <button className="back-button">戻る</button>
        </Link>
    </>);
}
