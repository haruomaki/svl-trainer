import csv
import random

# 新SVL12000全体を読み込む
_svl: list[dict] = list()
with open("svl_full.csv") as f:
    reader = csv.reader(f)
    next(reader)  # カラム名を飛ばす
    for i, line in enumerate(reader):
        _svl.append({"word": line[0], "level": int(line[1]), "meaning": line[2]})


def svl_sample(level: int, k: int = 10) -> list[dict[str, str]]:
    same_level = [e for e in _svl if e["level"] == level]
    return random.sample(same_level, k)
