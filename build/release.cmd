@echo off

if exist dist (
	rmdir dist /S /Q
)

mkdir dist\localization
mkdir dist\help

call npm run build:dist

REM .NET Build Tool
..\..\argos-sdk\tools\JsBit\jsbit.exe -p "build\release.jsb2" -d "."

if %errorlevel% neq 0 exit /b %errorlevel%

xcopy index.html .\dist /Y /Q
xcopy index.aspx .\dist /Y /Q
xcopy index-nocache.html .\dist /Y /Q
xcopy index-nocache.aspx .\dist /Y /Q
xcopy unsupported.html .\dist /Y /Q
xcopy manifest.appcache .\dist /Y /Q
xcopy web.config .\dist /Y /Q
xcopy ping.gif .\dist /Y /Q
