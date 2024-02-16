SET SDK=%CD%\..\..\argos-sdk
SET BUNDLE_NAME=%~1
SET BUNDLE_CONFIG_FILE=%~2
SET BUNDLE_FILE_NAME=%BUNDLE_NAME%.zip

%SDK%\tools\bundler\Bundler.exe /BundlerAction:b /IsCRMBundle:true /ProjectPath:"%CD%\deploy\bundle\model" /BundleFileName:"%CD%\deploy\%BUNDLE_FILE_NAME%" /BundleMethod:All /ConfigFileName:"%CD%\deploy\%BUNDLE_CONFIG_FILE%"
