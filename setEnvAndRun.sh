#!/usr/bin/env bash

# Export env vars
export $(grep -v '^#' .env | xargs)

k6 run -e FIREBASE_URL=${FIREBASE_URL} -e FIREBASE_TREINTA_KEY=${FIREBASE_TREINTA_KEY} -e FIREBASE_USER=${FIREBASE_USER} -e FIREBASE_USER_PASSWORD=${FIREBASE_USER_PASSWORD} -e ORCH_BASE_URL=${ORCH_BASE_URL} -e USER_ID=${USER_ID} -e STORE_ID=${STORE_ID} -e API_KEY=${API_KEY} ./tests/$1.test.js
