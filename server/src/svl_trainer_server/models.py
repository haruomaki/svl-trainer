# models.py
# =========================
# データベースのテーブル定義
# =========================

from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from svl_trainer_server.db import Base, engine


class WordStatusModel(Base):
    """
    単語ごとの学習状況を保存するテーブル
    """

    __tablename__ = "word_status"

    # 単語ID（主キー）
    word_id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        index=True,
    )

    # 学習状態: new / correct / incorrect など
    learning_status: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )

    # ユーザーが任意で付けるフラグ（1つ）
    user_flag: Mapped[Optional[str]] = mapped_column(
        String,
        nullable=True,
    )


# 初回起動時にテーブルを自動生成
print("データベースをロード…")
WordStatusModel.metadata.create_all(bind=engine)
