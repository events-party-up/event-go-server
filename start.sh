cd /root/event-go-server
NOW="$(date)"
$(mv nohup.log log/nohup-"$NOW".log)
echo "" > nohup.log
nohup npm start > nohup.log 2>&1 &
echo $! > app.pid
