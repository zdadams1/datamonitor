@echo off
cd server
start cmd /k npm start
timeout /t 5
cd ..
cd electron_app
start cmd /k npm start
