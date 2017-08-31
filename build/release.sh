#!/bin/sh
if [ -d "deploy" ]; then
    rm -rf deploy
fi

mkdir -p deploy/localization/locales/crm
mkdir -p deploy/help
mkdir -p deploy/content/javascript
mkdir -p deploy/content/images
mkdir -p deploy/content/css

# Grunt tasks required to generate a build (less for css and babel for js)
grunt clean:css
grunt clean:js
grunt less
npm run build

# Java Build Tool
#java -Dfile.encoding=UTF-8 -jar "../../argos-sdk/tools/JSBuilder/JSBuilder2.jar" -v -p "build/release.jsb2" -d "."

# Mono build Tool
mono ../../argos-sdk/tools/JsBit/jsbit.exe -p "build/release.jsb2" -d "."

cp index.html ./deploy
cp index.aspx ./deploy
cp index-nocache.html ./deploy
cp index-nocache.aspx ./deploy
cp unsupported.html ./deploy
cp manifest.appcache ./deploy
cp web.config ./deploy
cp ping.gif ./deploy
cp index.aspx.cs ./deploy
cp index.manifest ./deploy
cp index.manifest.ashx ./deploy
cp Global.asax ./deploy
