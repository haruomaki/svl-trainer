from sqlalchemy import Column, String
from svl_trainer_server.db import Base


class WordStatusModel(Base):
    __tablename__ = "word_status"

    word_id = Column(String, primary_key=True, index=True)
    learning_status = Column(String, nullable=False)
    user_flag = Column(String, nullable=True)
