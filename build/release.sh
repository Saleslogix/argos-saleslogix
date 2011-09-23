#!/bin/sh

if [ -d "deploy" ]; then
    rm -rf deploy
fi

mkdir -p deploy/localization
mkdir -p deploy/help
mkdir -p deploy/content/javascript
mkdir -p deploy/content/images
mkdir -p deploy/content/css

# .NET Build Tool
# mono ../../argos-sdk/tools/JsBit/JsBit.exe -p "build/release.jsb2" -d "."

# Java Build Tool
$JAVA_HOME/bin/java -Dfile.encoding=UTF-8 -jar "../../argos-sdk/tools/JSBuilder/JSBuilder2.jar" -v -p "build/release.jsb2" -d "."

cp index.html ./deploy
cp index.aspx ./deploy
cp index-nocache.html ./deploy
cp index-nocache.aspx ./deploy
cp unsupported.html ./deploy
cp index.manifest ./deploy
cp index.manifest.ashx ./deploy
cp template.manifest ./deploy
cp web.config ./deploy
