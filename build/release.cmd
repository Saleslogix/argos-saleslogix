@echo off

if exist deploy (
	rmdir deploy /S /Q
)

mkdir deploy\src
mkdir deploy\app\content\javascript
mkdir deploy\app\content\images
mkdir deploy\app\content\css

%JAVA_HOME%\bin\java -Dfile.encoding=UTF-8 -jar "../../argos-sdk/tools/JSBuilder/JSBuilder2.jar" -v -p "build/release.jsb2" -d "."
if %errorlevel% neq 0 exit /b %errorlevel% 
xcopy index.html .\deploy\app /Y /Q
xcopy index-nocache.html .\deploy\app /Y /Q
xcopy help.html .\deploy\app /Y /Q
xcopy index.manifest .\deploy\app /Y /Q
xcopy template.manifest .\deploy\app /Y /Q
xcopy index.manifest.ashx .\deploy\app /Y /Q
xcopy web.config .\deploy\app /Y /Q