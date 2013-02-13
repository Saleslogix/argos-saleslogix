define('Mobile/SalesLogix/ApplicationLayout', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/_base/event',
    'dojo/topic',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/NodeList-traverse',
    'argos/DialogPane',
    'argos/Layout',
    'argos/Pane',
    './TitleBar',
    './QuickNav'
], function(
    declare,
    array,
    lang,
    win,
    event,
    topic,
    domClass,
    domStyle,
    domGeom,
    domConstruct,
    query,
    nodeListTraverse,
    DialogPane,
    Layout,
    Pane,
    TitleBar,
    QuickNav
) {
    return declare('Mobile.SalesLogix.ApplicationLayout', [Layout], {
        tiers: 2,
        maximized: -1,
        components: [
            {name: 'navigation', type: QuickNav, attachPoint: 'panes.navigation', attachEvent: 'onToggle:_onNavigationToggle', props:{'class':'layout-left'}},
            {name: 'list', root: true, type: Pane, attachPoint: 'panes.list', props:{'class':'layout-center', tier: 0}, components: [
                {name: 'top', type: TitleBar, attachEvent: 'onPositionChange:_onToolbarPositionChange', props: {managed: true, visible: false}},
                {name: 'container', tag: 'div', attrs: {'class': 'view-container'}, attachPoint: 'viewContainerNode'}
            ]},
            {name: 'detail', type: Pane, attachPoint: 'panes.detail', props:{'class':'layout-right', tier: 1}},
            {name: 'dialog', type: DialogPane, attachPoint: 'panes.dialog'}
        ],

        _onLayoutClickHandle: null,

        onStartup: function() {
            this.inherited(arguments);

            this._onLayoutClickHandle = lang.hitch(this, this._onLayoutClick);

            this.domNode.addEventListener('click', this._onLayoutClickHandle, true);
        },
        onDestroy: function() {
            this.domNode.removeEventListener('click', this._onLayoutClickHandle, true);

            delete this._onLayoutClickHandle;
        },
        _contains: function(rootNode, testNode) {
            return rootNode.contains
                ? rootNode != testNode && rootNode.contains(testNode)
                : !!(rootNode.compareDocumentPosition(testNode) & 16);
        },
        _onNavigationToggle: function() {
            /* this.resize(); */
        },
        _onLayoutClick: function(evt) {
            if (this.$.navigation.get('expanded'))
            {
                evt = event.fix(evt);

                var contained = this._contains(this.domNode, evt.target) && !this._contains(this.$.navigation.domNode, evt.target);
                if (contained)
                {
                    this.$.navigation.toggle();

                    event.stop(evt);
                }
            }
        }
    });
});
