@echo off

copy CHANGE_ME.json DO_NOT_CHANGE\cypress\fixtures\config.json
cd DO_NOT_CHANGE
call npm install
call npm start
call npm run report
copy cypress\reports\index.html ..\REPORT.HTML