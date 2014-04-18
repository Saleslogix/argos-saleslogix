/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Address.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/Address/RelatedView', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment'

], function(
    declare,
    lang,
    connect,
    format,
    convert,
    RelatedViewWidget,
    moment
) {
    return declare('Mobile.SalesLogix.Views.Address.RelatedView', [RelatedViewWidget], {

        activitiesText: 'Addresses',

        id: 'relatedView_actvity',
        icon: 'content/images/icons/Map_24.png',
        itemIcon:'content/images/icons/Map_24.png',
        title: "Addresses",
        detailViewId: 'address_edit',
        insertViewId: 'address_edit',
        listViewId: 'address_related',
        listViewWhere: null,
        enabled: true,
        showAdd: true,
        resourceKind: 'addresses',
        //select: [],
        where:null ,
        sort: 'IsPrimary Desc',
        relatedItemHeaderTemplate: new Simplate([
            '<h3><strong>{%: $$.getItemDescriptor($) %} </h3>',
        ]),
       relatedItemDetailTemplate: new Simplate([
            '<h4>{%= Mobile.SalesLogix.Format.address($, true) %}</h4>'
       ]),
       getItemDescriptor: function(entry) {
            if (entry) {
                entry['$descriptor'] = (entry.description) ? entry.description : entry.$descriptor;
                return  entry.$descriptor;
            }
            return '';
       },
       navigateToDetailView: function(relatedKey, descriptor, title) {
           var entry = this.getItemEntry(relatedKey);
           App.showMapForAddress(format.address(entry, true, ' '));
       }
    });
});
