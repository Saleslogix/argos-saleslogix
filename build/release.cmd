@echo off

if exist deploy (
	rmdir deploy /S /Q
)

mkdir deploy\localization
mkdir deploy\help
mkdir deploy\content\javascript
mkdir deploy\content\images
mkdir deploy\content\css

REM .NET Build Tool
..\..\argos-sdk\tools\JsBit\jsbit.exe -p "build\release.jsb2" -d "."

REM Java Build Tool
REM %JAVA_HOME%\bin\java -Dfile.encoding=UTF-8 -jar "../../argos-sdk/tools/JSBuilder/JSBuilder2.jar" -v -p "build/release.jsb2" -d "."

if %errorlevel% neq 0 exit /b %errorlevel%

xcopy index.html .\deploy /Y /Q
xcopy index.aspx .\deploy /Y /Q
xcopy index-nocache.html .\deploy /Y /Q
xcopy index-nocache.aspx .\deploy /Y /Q
xcopy unsupported.html .\deploy /Y /Q
xcopy index.manifest .\deploy /Y /Q
xcopy template.manifest .\deploy /Y /Q
xcopy index.manifest.ashx .\deploy /Y /Q
xcopy web.config .\deploy /Y /Q