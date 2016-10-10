@echo off
DEL /Q /F docs-output
call grunt clean:js
call npm run build

pushd ..\..\argos-sdk
call grunt clean:js
call npm run build
popd

..\..\argos-sdk\tools\jsduck\jsduck.exe --config=src-docs\docs-config.json

EXIT /B 0
