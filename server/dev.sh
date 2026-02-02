#!/usr/bin/env bash

cd src/svl_trainer_server
uvicorn main:app --reload --port 12000
