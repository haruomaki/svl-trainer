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


def svl_questions(level: int, k: int = 10) -> list[dict[str, str]]:
    if k > 100:
        return "出題数が多すぎます"

    same_level = [e for e in _svl if e["level"] == level]

    ret = []
    for _ in range(k):
        w0 = random.choice(same_level)
        w1 = random.choice(same_level)
        w2 = random.choice(same_level)
        w3 = random.choice(same_level)
        word = w0["word"]
        choices = [
            (0, w0["meaning"]),
            (1, w1["meaning"]),
            (2, w2["meaning"]),
            (3, w3["meaning"]),
        ]
        random.shuffle(choices)

        # 正解番号を探す
        correct = 0
        for i, ch in enumerate(choices):
            if ch[0] == 0:
                correct = i
                break

        ret += [
            {
                "word": word,
                "choices": [ch[1] for ch in choices],
                "correct": correct,
            }
        ]
    return ret
