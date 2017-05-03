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
xcopy %SDK%\node_modules\redux\dist\redux.min.js %SDK%\deps\redux\ /E /Y

pushd %SDK%
call grunt clean:css clean:js less
call yarn run build
popd

xcopy %SDK%\*.* deploy\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk /E /Y /exclude:build\bundleExcludes.txt
xcopy *.* %SDK%\deploy\temp /E /Y /exclude:build\bundleExcludes.txt
xcopy %SDK%\deploy\temp\*.* deploy\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix /E /Y
rmdir %SDK%\deploy\temp /S /Q
rmdir %SDK%\deps /S /Q

%SDK%\tools\bundler\Bundler.exe /ProjectPath:"%CD%\deploy\bundle\model" /BundleFileName:"%CD%\deploy\%BUNDLE_NAME%" /BundleMethod:All /ConfigFileName:"%CD%\build\bundle.config"
