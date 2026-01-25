from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from svl_trainer_server.db import get_db
from svl_trainer_server.models import WordStatusModel
from svl_trainer_server.schemas import WordStatus

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/word-status")
def save_word_status(status: WordStatus, db: Session = Depends(get_db)):
    record = db.get(WordStatusModel, status.word_id)

    if record is None:
        record = WordStatusModel(
            word_id=status.word_id,
            learning_status=status.learning_status,
            user_flag=status.user_flag,
        )
        db.add(record)
    else:
        record.learning_status = status.learning_status
        record.user_flag = status.user_flag

    db.commit()
    return {"ok": True}


@app.get("/word-status/{word_id}")
def get_word_status(word_id: str, db: Session = Depends(get_db)):
    record = db.get(WordStatusModel, word_id)

    if record is None:
        return {
            "word_id": word_id,
            "learning_status": "new",
            "user_flag": None,
        }

    return {
        "word_id": record.word_id,
        "learning_status": record.learning_status,
        "user_flag": record.user_flag,
    }


@app.get("/.well-known/appspecific/com.chrome.devtools.json")
async def chrome_devtools_config():
    """Chrome DevToolsの設定ファイル（空で応答）"""
    return {}
