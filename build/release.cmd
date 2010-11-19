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
xcopy index.* .\deploy\app /Y /Q
xcopy index-nocache.* .\deploy\app /Y /Q
xcopy help.* .\deploy\app /Y /Q