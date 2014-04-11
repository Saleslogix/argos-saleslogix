/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Groups._RightDrawerGroupsMixin
 *
 * List mixin for right drawers.
 *
 * @since 3.0
 * @mixins Mobile.SalesLogix.Views._RightDrawerBaseMixin
 *
 */
define('Mobile/SalesLogix/Views/Groups/_RightDrawerGroupsMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'Mobile/SalesLogix/Views/_RightDrawerBaseMixin',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    array,
    lang,
    domConstruct,
    domAttr,
    _RightDrawerBaseMixin,
    SDataStore
) {

    return declare('Mobile.SalesLogix.Views.Groups._RightDrawerGroupsMixin', [_RightDrawerBaseMixin], {
        //Localization
        groupsSectionText: 'Groups',

        groupFamilyText: {
            'ACCOUNT': 'Accounts',
            'CONTACT': 'Contacts',
            'LEAD': 'Leads',
            'OPPORTUNITY': 'Opportunities',
            'TICKET': 'Tickets'
        },

        _hasChangedKPIPrefs: false,// Dirty flag so we know when to reload the widgets
        groupList: null,

        setupRightDrawer: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                lang.mixin(drawer, this._createActions());
                drawer.setLayout(this.createRightDrawerLayout());
                drawer.getGroupForEntry = lang.hitch(this, function(entry) {
                    return this.getGroupForRightDrawerEntry(entry);
                });
            }
        },
        unloadRightDrawer: function() {
            var drawer = App.getView('right_drawer');
            if (drawer) {
                drawer.setLayout([]);
                drawer.getGroupForEntry = function(entry) {};
                App.snapper.off('close');
            }
        },
        _createActions: function() {
            // These actions will get mixed into the right drawer view.
            var actions = {
                familyClicked: lang.hitch(this, function(params) {
                    App.setPrimaryTitle(this.titleText + ': ' + params.title);
                    this.set('store', this.createGroupStore(params.family));
                    this.clear(true);
                    this.refreshRequired = true;
                    this.refresh();
                    this.toggleRightDrawer();
                })
            };

            return actions;
        },
        getGroupForRightDrawerEntry: function(entry) {
            return {
                tag: 'group',
                title: this.groupsSectionText
            };
        },
        createRightDrawerLayout: function() {
            var groupsSection, layout, i, groupLayout, family;

            layout = [];

            groupsSection = {
                id: 'actions',
                children: []
            };

            if (this.groupFamilyText) {
                for (i in this.groupFamilyText) {
                    if (this.groupFamilyText.hasOwnProperty(i)) {
                        family = this.groupFamilyText[i];
                        groupsSection.children.push({
                            'name': i,
                            'action': 'familyClicked',
                            'title': family,
                            'dataProps': {
                                'family': i,
                                'title': family
                            }
                        });
                    }
                }

                layout.push(groupsSection);
            }

            return layout;
        }
    });
});

