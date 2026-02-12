import csv
import random
from collections import defaultdict
from typing import Any
from fastapi import HTTPException


CAND_N = 4


# 新SVL12000全体を読み込む
# レベル別に事前インデックス化
_svl_by_level: defaultdict[int, list[dict[str, Any]]] = defaultdict(list)
with open("svl_full.csv") as f:
    reader = csv.reader(f)
    next(reader)  # カラム名を飛ばす
    for wd, lv, mg in reader:
        lv = int(lv)
        _svl_by_level[lv].append({"word": wd, "level": lv, "meaning": mg})
# _svl: list[dict[str, Any]] = list(chain.from_iterable(_svl_by_level))  # flatten


def svl_sample(level: int, k: int = 10) -> list[dict[str, str]]:
    return random.sample(_svl_by_level[level], k)


def svl_questions(level: int, k: int = 10) -> list[dict[str, Any]]:
    if k > 100:
        raise HTTPException(status_code=400, detail="出題数が多すぎます")

    if len(_svl_by_level[level]) < CAND_N:
        raise HTTPException(status_code=500, detail="問題数が不足しています")

    ret = []
    for _ in range(k):
        candidates = random.sample(_svl_by_level[level], CAND_N)

        # シャッフル後のインデックス順
        indices = [i for i in range(CAND_N)]
        random.shuffle(indices)

        ret.append(
            {
                "word": candidates[0]["word"],
                "choices": [candidates[i]["meaning"] for i in indices],
                "correct": indices.index(0),
            }
        )
    return ret
