import { Link } from "react-router-dom";
import "./Hub.css"

export default function Hub() {
    return (<>
        <h1>SVL Trainer</h1>

        <div className="level-grid">
            {[...Array(12)].map((_, i) => (
                <Link
                    key={i}
                    to={`/quiz?level=${i + 1}`}
                    className="level-card"
                >
                    <span className="level-number">Level {i + 1}</span>
                </Link>
            ))}
        </div>
    </>);
}
