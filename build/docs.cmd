@echo off
DEL /Q /F docs-output
call grunt clean:js babel

pushd ..\..\argos-sdk
call grunt clean:js babel
popd

..\..\argos-sdk\tools\jsduck\jsduck.exe --config=src-docs\docs-config.json

EXIT /B 0
