#!/bin/bash
GOOS=linux go build -v -a --ldflags '-extldflags "-static"' -tags netgo -installsuffix netgo -o main .
