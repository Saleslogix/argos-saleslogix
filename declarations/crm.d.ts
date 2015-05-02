 /// <reference path="../../../argos-sdk/declarations/argos.d.ts"/>

declare var crm: any;
declare var Base64: any;

interface Window {
    BlobBuilder: any;
    WebKitBlobBuilder: any;
    MozBlobBuilder: any;
    MSBlobBuilder: any;
    Chart: any;
    unescape: any;
}

interface Application {
    initiateCall: any;
    initiateEmail: any;
    navigateToActivityInsertView: any;
    enableGroups: any;
    getMetricsByResourceKind: any;
    enableHashTags: boolean;
    showMapForAddress: any;
    imageFileTypes: any;
    nonViewableFileTypes: any;
    logOut: any;
    getCredentials: any;
    authenticateUser: any;
    requestUserDetails: any;
    requestUserOptions: any;
    requestSystemOptions: any;
    navigateToInitialView: any;
    navigateToHomeView: any;
    hasMultiCurrency: any;
    getBaseExchangeRate: any;
    getMyExchangeRate: any;
    canLockOpportunityRate: any;
    canChangeOpportunityRate: any;
    isNavigationFromResourceKind: any;
    speedSearch: any;
    reload: any;
    loadingText: string;
}

interface CalendarView extends View {
    getDateTime: () => Date;
}
