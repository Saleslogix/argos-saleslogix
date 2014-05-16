/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Accounts.RelatedViewDetail
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/Account/RelatedViewDetail', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/RelatedViewDetailWidget',
    'Mobile/SalesLogix/Views/Account/Detail'
 
], function(
    declare,
    RelatedViewDetailWidget,
    AccountDetail
   
) {
    return declare('Mobile.SalesLogix.Views.Account.RelatedViewDetail', [RelatedViewDetailWidget], {
        relatedDetailWidget: AccountDetail,
        relatedProperty: '$key',
        editViewId: 'account_edit'
       
    });
});
