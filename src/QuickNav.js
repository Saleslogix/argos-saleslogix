define('Mobile/SalesLogix/QuickNav', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-attr',
    'dojox/mobile/FixedSplitterPane',
    'Sage/Platform/Mobile/_UiComponent',
    'Sage/Platform/Mobile/_EventMapMixin',
    'argos!scene',
    'argos!customizations'
], function(
    declare,
    array,
    lang,
    domAttr,
    FixedSplitterPane,
    _UiComponent,
    _EventMapMixin,
    scene,
    customizations
) {
    return declare('Mobile.SalesLogix.QuickNav', [FixedSplitterPane, _EventMapMixin, _UiComponent], {
        events: {
            'click': true
        },
        baseClass: 'quick-nav',
        components: [
            {name: 'back', content: '<button class="button quick-nav-back" data-action="navigateBack"><span></span></button>'},
            {name: 'home', content: '<button class="button quick-nav-home" data-action="navigateToHomeView"><span></span></button>'}
        ],
        homeView: 'home',
        navigateBack: function() {
            scene().back();
        },
        navigateToHomeView: function() {
            scene().showView(this.homeView, {});
        }
    });
});