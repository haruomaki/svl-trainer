#!/usr/bin/env bash

root=$(realpath "$(dirname $0)")
cd "$root/src/svl_trainer_server"
"$root/venv/bin/uvicorn" main:app --reload --port 12000
