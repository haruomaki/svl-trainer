from pydantic import BaseModel
from typing import Optional, Literal

LearningStatus = Literal["new", "correct", "wrong"]


class WordStatus(BaseModel):
    word_id: str
    learning_status: LearningStatus
    user_flag: Optional[str] = None
