#!/bin/bash
pushd /root/event-go-server
PIDFile="./app.pid"
PROCESS_INFO=$(ps -p $(<"$PIDFile") | awk '{print $1}' | wc -l)
NOW="$(date)"
if [ $PROCESS_INFO -eq 1 ];
then
        echo "lol $(<"$PIDFile") die at $NOW" >> ./auto_restart.txt
        ./start.sh
fi
popd
exit 0
