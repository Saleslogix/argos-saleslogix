define('Mobile/SalesLogix/TitleBar', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/TitleBar'
], function(
    declare,
    TitleBar
) {
    return declare('Mobile.SalesLogix.TitleBar', [TitleBar], {

        homeView: 'home',

        titleText: 'SalesLogix',

        _setItemsAttr: function(items) {
            var hasItemsOnLeft;

            if (items)
            {
                for (var i = 0; i < items.length; i++)
                {
                    if (items[i].side == 'left')
                    {
                        hasItemsOnLeft = true;
                        break;
                    }
                }
            }

            if (hasItemsOnLeft || items === false) return this.inherited(arguments);

            this.inherited(arguments);
        }
    });
});