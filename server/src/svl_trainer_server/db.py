# db.py
# =========================
# データベース接続とセッション管理の基盤
# =========================

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 使用するデータベース（SQLite）
DATABASE_URL = "sqlite:///./progress.sqlite3"

# データベースへの接続エンジン
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # FastAPI + SQLite 用
)

# DB操作用の Session を生成するためのファクトリ
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# モデル（テーブル定義）の共通の基底クラス
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
