@echo off

PUSHD ..\..\argos-sdk\tools\argos-localizer\
argos-localizer.exe import --base-path ..\..\.. --config-path ..\..\..\products\argos-saleslogix\build\localization.json
POPD
