define('Mobile/SalesLogix/ApplicationLayout', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Layout',
    'Sage/Platform/Mobile/Pane',
    './QuickNav'
], function(
    declare,
    lang,
    Layout,
    Pane,
    QuickNav
) {
    return declare('Mobile.SalesLogix.ApplicationLayout', [Layout], {
        tiers: 2,
        components: [
            {name: 'navigation', type: QuickNav, props:{'class':'layout-left'}},
            {name: 'list', type: Pane, attachPoint: 'panes.list', props:{'class':'layout-center', tier: 0}},
            {name: 'detail', type: Pane, attachPoint: 'panes.detail', props:{'class':'layout-right', tier: 1}}
        ]
    });
});