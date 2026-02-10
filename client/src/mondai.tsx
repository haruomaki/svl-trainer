import type { SceneProps } from "./types";

export function Mondai({ setScene }: SceneProps) {
    return (
        <div>
            <p>こんにちは</p>

            <button onClick={() => setScene("title")}>
                戻る
            </button>
        </div>
    )
}
