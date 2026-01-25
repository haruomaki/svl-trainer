from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import WordStatus

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fake_db: dict[str, WordStatus] = {}


@app.post("/word-status")
def save_word_status(status: WordStatus):
    fake_db[status.word_id] = status
    return {"ok": True}


@app.get("/word-status/{word_id}")
def get_word_status(word_id: str):
    return fake_db.get(
        word_id, {"word_id": word_id, "learning_status": "new", "user_flag": None}
    )


@app.get("/.well-known/appspecific/com.chrome.devtools.json")
async def chrome_devtools_config():
    """Chrome DevToolsの設定ファイル（空で応答）"""
    return {}
