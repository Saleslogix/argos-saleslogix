@echo off

if exist deploy (
	rmdir deploy /S /Q
)

mkdir deploy\localization
mkdir deploy\help
mkdir deploy\content\javascript
mkdir deploy\content\images
mkdir deploy\content\css
mkdir deploy\scripts

call grunt clean:css clean:js less
call yarn run build

REM .NET Build Tool
..\..\argos-sdk\tools\JsBit\jsbit.exe -p "build\release.jsb2" -d "."

if %errorlevel% neq 0 exit /b %errorlevel%

xcopy index.html .\deploy /Y /Q
xcopy index.aspx .\deploy /Y /Q
xcopy index-nocache.html .\deploy /Y /Q
xcopy index-nocache.aspx .\deploy /Y /Q
xcopy unsupported.html .\deploy /Y /Q
xcopy manifest.appcache .\deploy /Y /Q
xcopy web.config .\deploy /Y /Q
xcopy ping.gif .\deploy /Y /Q
xcopy index.aspx.cs .\deploy /Y /Q
xcopy index.ascx .\deploy /Y /Q
xcopy index.ascx.cs .\deploy /Y /Q
xcopy index.manifest .\deploy /Y /Q
xcopy index.manifest.ashx .\deploy /Y /Q
xcopy Global.asax .\deploy /Y /Q
xcopy build\iis.ps1 .\deploy\scripts /Y /Q
