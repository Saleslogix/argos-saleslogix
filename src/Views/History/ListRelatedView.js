/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.History.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/History/ListRelatedView', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Views/History/RelatedView'  
], function(
    declare,
    HistoryRelatedView

) {
    return declare('Mobile.SalesLogix.Views.History.ListRelatedView', [HistoryRelatedView], {
        id: 'list-related-view-Notes',
        autoLoad: true,
        showAdd: false,
        showRefresh: false,
        showNavigateToList : false,
        showTab: false,
        enableActions: true,
        showTotalInTab: false,
        hideWhenNoData: true,
    });
});
