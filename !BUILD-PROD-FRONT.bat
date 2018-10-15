@echo off
title Main
chcp 65001
cls
call ./node_modules/.bin/webpack  --config webpack.dev1.js
call ./node_modules/.bin/electron .
pause
