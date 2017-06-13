#!/bin/sh
kill $(lsof -t -i:4000)
