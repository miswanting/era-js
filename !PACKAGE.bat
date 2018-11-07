@echo off
call .\node_modules\.bin\electron-builder --dir
ren "dist\win-unpacked\era-js.exe" "Era.js.exe"
pause