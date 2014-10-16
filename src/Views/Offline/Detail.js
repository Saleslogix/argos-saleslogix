/**
 * @class Mobile.SalesLogix.Views.Offline.Detail
 *
 *
 * @extends Sage.Platform.Mobile.Detail
 * @requires Sage.Platform.Mobile.Detail
 *
 */
define('Mobile/SalesLogix/Views/Offline/Detail', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/_DetailBase'
], function(
    declare,
    _DetailBase
    ) {

    return declare('Mobile.SalesLogix.Views.Offline.Detail', [_DetailBase], {
        id: 'offline_detail',
        titleText: 'Offline Detail'
    });
});

