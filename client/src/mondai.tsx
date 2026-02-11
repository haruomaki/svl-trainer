import { Link } from 'react-router-dom';

export function Mondai() {
    return (
        <div>
            <p>こんにちは</p>

            <Link to="/">
                <button>
                    戻る
                </button>
            </Link>
        </div>
    )
}
