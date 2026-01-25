# models.py
# =========================
# データベースのテーブル定義
# =========================

from sqlalchemy import Column, String
from svl_trainer_server.db import Base


class WordStatusModel(Base):
    """
    単語ごとの学習状況を保存するテーブル
    """

    __tablename__ = "word_status"

    # 単語ID（主キー）
    word_id = Column(String, primary_key=True, index=True)

    # 学習状態: new / correct / incorrect など
    learning_status = Column(String, nullable=False)

    # ユーザーが任意で付けるフラグ（1つ）
    user_flag = Column(String, nullable=True)
