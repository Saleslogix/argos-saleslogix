SET SDK=%CD%\..\..\argos-sdk
SET VERSION=%~1
SET BUNDLE_NAME=Infor Mobile v%VERSION% for 8.0 and 8.1 VFS.zip

rmdir /S /Q deploy
rmdir /S /Q %SDK%\deploy

mkdir deploy
mkdir %SDK%\deploy
mkdir %SDK%\deploy\temp
mkdir deploy\bundle
mkdir deploy\bundle\model
xcopy bundle\model\*.* deploy\bundle\model /E /Y

mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles
mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk
mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\products
mkdir deploy\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix

xcopy %SDK%\*.* deploy\bundle\model\Portal\SlxMobile\SourceFiles\argos-sdk /E /Y /exclude:build\bundleExcludes.txt
xcopy *.* %SDK%\deploy\temp /E /Y /exclude:build\bundleExcludes.txt
xcopy %SDK%\deploy\temp\*.* deploy\bundle\model\Portal\SlxMobile\SourceFiles\products\argos-saleslogix /E /Y
rmdir %SDK%\deploy\temp /S /Q

%SDK%\tools\bundler\Bundler.exe /ProjectPath:"%CD%\deploy\bundle\model" /BundleFileName:"%CD%\deploy\%BUNDLE_NAME%" /BundleMethod:All /ConfigFileName:"%CD%\build\bundle.config"