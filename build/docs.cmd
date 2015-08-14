@echo off
grunt clean:js
grunt babel
..\..\argos-sdk\tools\jsduck\jsduck.exe --config=src-docs\docs-config.json

EXIT /B 0
