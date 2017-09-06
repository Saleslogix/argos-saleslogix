Param
(
    [Parameter(Mandatory = $true)]
    [String]$branch,

    [Parameter(Mandatory = $true)]
    [String]$build
)

$www = "C:\inetpub\wwwroot\mobile-builds\$branch"
Import-Module "WebAdministration";
New-Item "IIS:\Sites\Saleslogix\mobile-builds\$branch\$build" -type Application -physicalPath $www\$build
Set-ItemProperty "IIS:\Sites\Saleslogix\mobile-builds\$branch\$build" -Name applicationPool -Value "SalesLogix"
