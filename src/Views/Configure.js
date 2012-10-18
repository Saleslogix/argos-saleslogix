define('Mobile/SalesLogix/Views/Configure', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-class',
    'argos/List',
    'dojo/NodeList-traverse',
    'argos!scene'
], function(
    declare,
    array,
    lang,
    query,
    string,
    domAttr,
    domClass,
    List,
    scene
) {

    return declare('Mobile.SalesLogix.Views.Configure', [List], {
        //Templates
        emptyTemplate: new Simplate(['']),
        itemTemplate: new Simplate([
            '<h3>',
            '<span>{%: $.$descriptor %}</span>',
            '<span data-action="moveUp"></span>',
            '<span data-action="moveDown"></span>',
            '</h3>'
        ]),

        // Localization
        titleText: 'Configure',

        //View Properties
        id: 'configure',
        expose: false,
        enableSearch: false,
        selectionOnly: true,
        allowSelection: true,
        autoClearSelection: false,

        onStartup: function() {
            this.inherited(arguments);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                top: [{
                    id: 'save',
                    fn: this.savePreferences,
                    scope: this
                },{
                    id: 'cancel',
                    place: 'left',
                    fn: scene().back,
                    scope: scene()
                }]
            });
        },
        savePreferences: function() {
            App.preferences.home = App.preferences.home || {};
            App.preferences.configure = App.preferences.configure || {};

            // clear existing
            var visible = App.preferences.home.visible = [];
            var order = App.preferences.configure.order = [];

            // since the selection model does not have ordering, use the DOM
            query('li', this.domNode).forEach(function(node) {
                var key = domAttr.get(node, 'data-key');
                if (key)
                {
                    order.push(key);

                    if (domClass.contains(node, 'list-item-selected'))
                    {
                        visible.push(key);
                    }
                }
            });

            App.persistPreferences();

            scene().back();
        },
        moveUp: function(params) {
            var node = query(params.$source),
                row = node.parents('li');

            if (row)
                row.insertBefore(row.prev('li'))
        },
        moveDown: function(params) {
            var node = query(params.$source),
                row = node.parents('li');

            if (row)
                row.insertAfter(row.next('li'))
        },
        hasMoreData: function() {
            return false;
        },
        _requestData: function() {
            var list = [],
                lookup = {},
                exposed = App.getExposedViews(),
                order = lang.getObject('preferences.configure.order', false, App) || [];

            for (var i = 0; i < exposed.length; i++)
                lookup[exposed[i]] = true;

            for (var i = 0; i < order.length; i++)
                if (lookup[order[i]])
                    delete lookup[order[i]];

            for (var n in lookup)
                order.push(n);

            for (i = 0; i < order.length; i++)
            {
                var view = scene().getView(order[i]);
                if (view && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(order[i]) >= 0)
                {
                    list.push({
                        '$key': view.id,
                        '$descriptor': view.titleText,
                        'icon': view.icon
                    });
                }
                else
                {
                    order.splice(i, 1);
                    i -= 1;
                }
            }

            this._processData({'$resources': list});
        },
        _processData: function(feed) {
            this.inherited(arguments);

            var visible = (App.preferences.home && App.preferences.home.visible) || [];

            for (var i = 0; i < visible.length; i++)
            {
                var row = query((string.substitute('[data-key="${0}"]', [visible[i]])), this.domNode)[0];

                if (row)
                    this._selectionModel.toggle(visible[i], this.entries[visible[i]], row);
            }
        }
    });
});