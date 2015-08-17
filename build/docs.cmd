@echo off
call grunt clean:js babel
..\..\argos-sdk\tools\jsduck\jsduck.exe --config=src-docs\docs-config.json

EXIT /B 0
