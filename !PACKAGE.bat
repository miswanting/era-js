@echo off
call .\node_modules\.bin\electron-packager --overwrite .
mkdir .\build\Era.js
xcopy .\era.js-win32-x64\* .\build\Era.js\ /e /y
rmdir /s /q .\era.js-win32-x64
pause