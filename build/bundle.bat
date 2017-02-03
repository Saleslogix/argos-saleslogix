SET SDK=%CD%\..\..\argos-sdk
SET VERSION=%~1
REM :: Mobile supports the current platform + one prior
SET BUNDLE_NAME=ICRM Mobile v%VERSION% for 8.2 and later VFS.zip

call yarn run build:dist

rmdir /S /Q dist
rmdir /S /Q %SDK%\dist

mkdir dist
mkdir %SDK%\dist
mkdir %SDK%\dist\temp
mkdir dist\bundle
mkdir dist\bundle\model
xcopy bundle\model\*.* dist\bundle\model /E /Y

mkdir dist\bundle\model\Portal\SlxMobile\SourceFiles
mkdir dist\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk
mkdir dist\bundle\model\Portal\SlxMobile\SourceFiles\products
mkdir dist\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix

pushd %SDK%
call yarn run build:dist
popd

xcopy %SDK%\*.* dist\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk /E /Y /exclude:build\bundleExcludes.txt
xcopy *.* %SDK%\dist\temp /E /Y /exclude:build\bundleExcludes.txt
xcopy %SDK%\dist\temp\*.* dist\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix /E /Y
rmdir %SDK%\dist\temp /S /Q

%SDK%\tools\bundler\Bundler.exe /ProjectPath:"%CD%\dist\bundle\model" /BundleFileName:"%CD%\dist\%BUNDLE_NAME%" /BundleMethod:All /ConfigFileName:"%CD%\build\bundle.config"
