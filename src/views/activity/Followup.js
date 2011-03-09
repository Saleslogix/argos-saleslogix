/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Followup = Ext.extend(Mobile.SalesLogix.Activity.Edit, {
        //View Properties
		id: 'activity_followup_edit',

        applyContext: function() {
            //Bypass Activity Edit's applyContext 
            Mobile.SalesLogix.Activity.Edit.superclass.applyContext.apply(this, arguments);
        }
    });     
})();
