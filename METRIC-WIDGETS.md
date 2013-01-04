Metric Widget Customization
------------

* Check out the topic-metrics-2 branch for argso-saleslogix
* Use this fork of the argos-sdk: https://github.com/jbest84/argos-sdk/tree/2.0
 The fork for the sdk backports the sdata store from the master to 2.0 branch
* If you want a list view to support metric widgets, have the list extend the /Views/_MetricListMixin
```javascript
define('Mobile/SalesLogix/Views/Account/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/List',
    '../_MetricListMixin'
], function(
    declare,
    array,
    string,
    action,
    List,
    _MetricListMixin
) {

    return declare('Mobile.SalesLogix.Views.Account.List', [List, _MetricListMixin], {});
}
```
* Set a property on the list view for entity name. This is used by the metadata sdata endpoint to get a list of metrics/fitlers for that view
```javascript
entityName: 'Account',
```
* The list view will now have a configure icon in the upper right, users can add metric widgets as they wish
