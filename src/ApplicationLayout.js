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
    'dojo/query',
    'dojo/NodeList-traverse',
    'Sage/Platform/Mobile/Layout',
    'Sage/Platform/Mobile/Pane',
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
    query,
    nodeListTraverse,
    Layout,
    Pane,
    TitleBar,
    QuickNav
) {
    return declare('Mobile.SalesLogix.ApplicationLayout', [Layout], {
        tiers: 2,
        components: [
            {name: 'navigation', type: QuickNav, props:{'class':'layout-left'}},
            {name: 'list', root: true, type: Pane, attachPoint: 'panes.list', props:{'class':'layout-center', tier: 0}, components: [
                {name: 'top', type: TitleBar, attachEvent: 'onPositionChange:_onToolbarPositionChange', props: {managed: true, visible: false}},
                {name: 'container', tag: 'div', attrs: {'class': 'view-container'}, attachPoint: 'viewContainerNode'}
            ]},
            {name: 'detail', type: Pane, attachPoint: 'panes.detail', props:{'class':'layout-right', tier: 1}}
        ],
        _signals: null,
        _onLayoutClickHandle: null,
        _onCheckViewportHeightHandle: null,
        _lastViewportHeight: null,

        constructor: function() {
            this._signals = [];
        },
        _createHeightFixNode: function() {
            return domConstruct.create('div', {
                'class': 'layout-height-fix is-hidden'
            }, win.body());
        },
        hideNativeUrlBar: function() {
            if (!this.heightFixNode) this.heightFixNode = this._createHeightFixNode();

            domClass.remove(this.heightFixNode, 'is-hidden');

            var self = this;
            setTimeout(function () {
                window.scrollTo(0,1);
            }, 0);

            setTimeout(function() {
                window.scrollTo(0,0);

                domClass.add(self.heightFixNode, 'is-hidden');

                self.resize();
            }, 0);
        },
        onStartup: function() {
            this.inherited(arguments);

            var hasTouch = 'ontouchstart' in window;
            if (hasTouch)
            {
                this.hideNativeUrlBar();

                // if the bar is shown, `window.innerHeight` reflects the change, but resize is never called.
                this._lastViewportHeight = window.innerHeight;
                this._onCheckViewportHeightHandle = setInterval(lang.hitch(this, this._onCheckViewportHeight), 50);
            }

            this._onLayoutClickHandle = lang.hitch(this, this._onLayoutClick);

            this.domNode.addEventListener('click', this._onLayoutClickHandle, true);
        },
        onDestroy: function() {
            array.forEach(this._signals, function(signal) {
                signal.remove();
            });

            delete this._signals;

            this.domNode.removeEventListener('click', this._onLayoutClickHandle, true);

            delete this._onLayoutClickHandle;
        },
        _onCheckViewportHeight: function() {
            if (window.innerHeight != this._lastViewportHeight)
            {
                this.resize();
                this._lastViewportHeight = window.innerHeight;
            }
        },
        _contains: function(rootNode, testNode) {
            return rootNode.contains
                ? rootNode != testNode && rootNode.contains(testNode)
                : !!(rootNode.compareDocumentPosition(testNode) & 16);
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
        },
        resize: function() {
            var hasTouch = 'ontouchstart' in window;
            if (hasTouch)
            {
                /* this is required in order to hide the native URL bar */
                domGeom.setMarginBox(this.domNode, {
                    w: window.innerWidth,
                    h: window.innerHeight
                });
            }

            this.inherited(arguments);
        }
    });
});
