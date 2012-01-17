/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        titleText: 'Ticket Activity Part',
        productText: 'product',
        quantityText: 'quantity',

        //View Properties
        entityName: 'TicketActivity',
        id: 'ticketactivityitem_edit',
        insertSecurity: 'Entities/TicketActivityItem/Add',
        updateSecurity: 'Entities/TicketActivityItem/Edit',
        querySelect: [
            'Product',
            'ItemQuantity'
        ],
        resourceKind: 'ticketActivities',

        createRequest: function() {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService());

            if (this.entry && this.entry['$key'])
                request.setResourceSelector([this.entry['$key']]);

            if (this.resourceKind)
                request.setResourceKind(this.resourceKind);
            
             var activitySelect = ['Items'];
            request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, activitySelect.join(','));

            var activityContext = App.isNavigationFromResourceKind( ['ticketActivities'] );
            var key = activityContext.key;
            var resourcePredicateExpr = this.expandExpression(dojo.string.substitute("'${0}'", [key]));
            if (resourcePredicateExpr)
                request
                    .getUri()
                    .setCollectionPredicate(resourcePredicateExpr);

            return request;
        },

        getValues: function(all){
            var activityContext = App.isNavigationFromResourceKind( ['ticketActivities'] );
            var key = activityContext.key;
            var ticketContext = App.isNavigationFromResourceKind( ['tickets'] );
            var ticketKey = ticketContext.key;

            // conform to this format:
            // http://50.16.242.109/sdata/slx/dynamic/-/ticketActivities('QQF8AA0004DA')?_includeContent=false&select=Items&format=json
            var entryValues = this.convertValues(this.inherited(arguments));

            var values = {
                'Items': {
                    '$resources': [entryValues]
                },
                '$key': key,
                'Ticket': {
                    '$key': ticketKey
                },
                '$name': 'TicketActivity'
            };

            return values;
        },
        createEntryForUpdate: function(values) {
            values.Items['$resources'][0]['$key'] = this.entry['$key'];
            return values;
        },
        createEntryForInsert: function(values){
            return values;
        },
        insert: function() {
            this.disable();

            var values = this.getValues();
            if (values)
            {
                var entry = this.createEntryForInsert(values);

                var request = this.createRequest();
                if (request)
                    request.update(entry, {
                        success: this.onInsertSuccess,
                        failure: this.onInsertFailure,
                        scope: this
                    });
            }
            else
            {
                ReUI.back();
            }
        },
        onInsertSuccess: function(entry) {
            this.enable();

            App.onRefresh({
                resourceKind: 'ticketActivityItems'
            });

            this.onInsertCompleted(entry);
        },
        onUpdateSuccess: function(entry) {
            this.enable();

            App.onRefresh({
                resourceKind: 'ticketActivityItems',
                key: entry['$key'],
                data: entry
            });

            this.onUpdateCompleted(entry);
        },

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.productText,
                    name: 'Product',
                    property: 'Product',
                    textProperty: 'Name',
                    type: 'lookup',
                    view: 'ticketactivityitem_productlist'
                }
            ]);
        }
    });
});