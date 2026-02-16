import { useSearchParams } from 'react-router-dom';
import { api } from './API';
import { useEffect, useState } from 'react';
import "./Quiz.css";
import { useSpeech } from './speech';

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

    // 単語が新しくなると再生する
    const { speak } = useSpeech();
    useEffect(() => {
        if (currentQ?.word) {
            speak(currentQ.word);
        }
    }, [speak, currentQ]);


    // 問題の取得が終わるまでローディング画面
    if (questions.length === 0) {
        return <p>Loading...</p>;
    }

    // 結果表示画面
    if (currentIndex == questions.length) {
        return (<div className='centered-page'><div className='quiz-result'>
            <table>
                <thead>
                    <tr>
                        <th className="col-mark">正誤</th>
                        <th className="col-word">単語</th>
                        <th className="col-meaning">意味</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(k).keys()].map(i => (
                        // 行はクリック可能
                        // TODO: 「問題を出す画面」と「一つの単語を閲覧する画面」を分ける？
                        <tr className="result-row"
                            key={i}
                            onClick={() => speak(questions[i].word)}>
                            <td className={`col-mark ${answers[i] == questions[i].correct ? "correct-cell" : "incorrect-cell"}`}>
                                {answers[i] == questions[i].correct ? "〇" : "✖"}
                            </td>
                            <td className="col-word">{questions[i].word}</td>
                            <td className="col-meaning">{questions[i].choices[questions[i].correct]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="navi-button" onClick={() => setReloadCount(c => c + 1)}>
                次の{k}問へ
            </button>
        </div></div>)
    }

    // 出題画面
    return (<div className='centered-page'><div className='quiz'>
        <p className="quiz-status">Level {level} &emsp; 問題 {currentIndex + 1} / {questions.length}</p>

        {/* TODO: ヘッダーが長すぎる時のセンタリングがおかしい */}
        <div className='quiz-header'>
            {/* 音声読み上げボタン */}
            <button className='speak-button'
                onClick={() => { speak(currentQ.word) }}
                title="音声を再生"
            >🔊</button>

            <h1 className='quiz-word'>{currentQ.word}</h1>

            {/* 検索ボタン */}
            {/* TODO: 検索URLをユーザが設定できるようにする */}
            <a className="search-button"
                href={"https://eow.alc.co.jp/search?q=" + currentQ.word}
                target="_blank"
                title={`"${currentQ.word}" をWeb検索`}>
                🔍</a>
        </div>

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

        <button className="navi-button" onClick={() => {
            // 次の問題へ進む
            setCurrentIndex(currentIndex + 1);
        }}>
            次へ
        </button>
    </div></div>);
}
