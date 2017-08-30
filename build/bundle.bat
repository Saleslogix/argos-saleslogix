SET SDK=%CD%\..\..\argos-sdk
SET VERSION=%~1
REM :: Mobile supports the current platform + one prior
SET BUNDLE_NAME=ICRM Mobile v%VERSION% for 8.2 and later VFS.zip

call grunt clean:css clean:js less
call yarn run build

rmdir /S /Q deploy
rmdir /S /Q %SDK%\deploy

mkdir deploy
mkdir %SDK%\deploy
mkdir %SDK%\deps
mkdir %SDK%\deploy\temp
mkdir deploy\bundle
mkdir deploy\bundle\model
xcopy bundle\model\*.* deploy\bundle\model /E /Y

mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles
mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk
mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\products
mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix

xcopy %SDK%\node_modules\babel-polyfill\dist\polyfill.min.js %SDK%\deps\babel-polyfill\ /E /Y
xcopy %SDK%\node_modules\moment\min\moment-with-locales.js %SDK%\deps\moment\ /E /Y
xcopy %SDK%\node_modules\rx-lite\rx.lite.js %SDK%\deps\rx-lite\ /E /Y
xcopy %SDK%\node_modules\@infor\icrm-js-common\dist\bundles\common.bundle.js %SDK%\deps\icrm-js-common\ /E /Y
xcopy %SDK%\node_modules\@infor\icrm-js-customization\dist\bundles\customization.bundle.js %SDK%\deps\icrm-js-customization\ /E /Y
xcopy %SDK%\node_modules\@infor\icrm-js-services\dist\bundles\icrm-js-services.js %SDK%\deps\icrm-js-services\ /E /Y
xcopy %SDK%\node_modules\redux\dist\redux.min.js %SDK%\deps\redux\ /E /Y
xcopy %SDK%\node_modules\jquery\dist\jquery.js %SDK%\deps\jquery\ /E /Y
xcopy %SDK%\node_modules\@infor\sohoxi\dist\js\sohoxi.js %SDK%\deps\sohoxijs\ /E /Y
xcopy %SDK%\node_modules\@infor\sohoxi\dist\css\*.css %SDK%\deps\sohoxicss\ /E /Y
xcopy %SDK%\node_modules\@infor\sohoxi\dist\js\cultures\*.js %SDK%\deps\sohoxicultures\ /E /Y

pushd %SDK%
call grunt clean:css clean:js less
call yarn run build
popd

xcopy %SDK%\*.* deploy\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk\ /E /Y /exclude:build\bundleExcludes.txt
xcopy *.* %SDK%\deploy\temp\ /E /Y /exclude:build\bundleExcludes.txt
xcopy %SDK%\deploy\temp\*.* deploy\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix\ /E /Y
rmdir %SDK%\deploy\temp /S /Q
rmdir %SDK%\deps /S /Q

REM Find a clean way to exclude src folder
REM having src\ in excludes file causes *src* pattern matching
rmdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix\src /S /Q

%SDK%\tools\bundler\Bundler.exe /ProjectPath:"%CD%\deploy\bundle\model" /BundleFileName:"%CD%\deploy\%BUNDLE_NAME%" /BundleMethod:All /ConfigFileName:"%CD%\build\bundle.config"
