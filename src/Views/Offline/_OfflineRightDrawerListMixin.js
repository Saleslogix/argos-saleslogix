import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import domAttr from 'dojo/dom-attr';
import _RightDrawerBaseMixin from '../_RightDrawerBaseMixin';

const mixinName = 'crm.Views.Offline._OfflineRightDrawerListMixin';

/**
 * @class crm.Views._SpeedSearchRightDrawerListMixin
 *
 * Speedsearch specific mixin for right drawer functionality.
 *
 * @mixins crm.Views._RightDrawerBaseMixin
 *
 */
const __class = declare('crm.Views.Offline._OfflineRightDrawerListMixin', [_RightDrawerBaseMixin], {
  // Localization
  entitySectionText: 'Entity',

  _hasChangedEntityPrefs: false, // Dirty flag so we know when to reload the widgets

  onShow: function onShow() {
    this.setDefaultEntityPreferences();
  },
  setDefaultEntityPreferences: function setDefaultEntityPreferences() {
    if (!App.preferences.offlineEntityFilters) {
      const defaults = this.getDefaultEntityPreferences();
      App.preferences.offlineEntityFilters = defaults;
      App.persistPreferences();
    }
  },
  getDefaultEntityPreferences: function getDefaultEntityPreferences() {
    return Object.keys(this.entityMappings).map((name) => {
      return {
        name,
        enabled: true,
      };
    });
  },
  setupRightDrawer: function setupRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      lang.mixin(drawer, this._createActions());
      drawer.setLayout(this.createRightDrawerLayout());
      drawer.getGroupForEntry = lang.hitch(this, function getGroupForRightDrawerEntry(entry) {
        return this.getGroupForRightDrawerEntry(entry);
      });

      if (this.rebuildWidgets) {
        App.snapper.on('close', lang.hitch(this, function onSnapperClose() {
          if (this._hasChangedEntityPrefs) {
            this.rebuildWidgets();
            this._hasChangedEntityPrefs = false;
          }
        }));
      }
    }
  },
  unloadRightDrawer: function unloadRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      drawer.setLayout([]);
      drawer.getGroupForEntry = function snapperOff() {};
      App.snapper.off('close');
    }
  },
  _onSearchExpression: function _onSearchExpression() {
    // TODO: Don't extend this private function - connect to the search widget onSearchExpression instead
    this.inherited(arguments);
  },
  _createActions: function _createActions() {
    // These actions will get mixed into the right drawer view.
    const actions = {
      entityFilterClicked: lang.hitch(this, function onentityFilterClicked(params) {
        const prefs = App.preferences && App.preferences.offlineEntityFilters;

        const results = array.filter(prefs, function getResults(pref) {
          return pref.name === params.entityname;
        });
        this.activateEntityFilter(params.entityname);
        if (results.length > 0) {
          const enabled = !!results[0].enabled;
          results[0].enabled = !enabled;
          App.persistPreferences();
          this._hasChangedEntityPrefs = true;
          domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
        }
      }),
    };

    return actions;
  },
  getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
    if (entry.dataProps && entry.dataProps.entityname) {
      const mixin = lang.getObject(mixinName);
      return {
        tag: 'view',
        title: mixin.prototype.entitySectionText,
      };
    }
  },
  createRightDrawerLayout: function createRightDrawerLayout() {
    const layout = [];
    const entitySection = {
      id: 'actions',
      children: Object.keys(this.entityMappings).map((entityName) => {
        const prefs = App.preferences && App.preferences.offlineEntityFilters;
        const entityPref = array.filter(prefs, (pref) => {
          return pref.name === entityName;
        });
        const [enabled] = entityPref;

        return {
          'name': entityName,
          'action': 'entityFilterClicked',
          'title': this.entityText[entityName] || entityName,
          'dataProps': {
            'entityname': entityName,
            'enabled': !!enabled,
          },
        };
      }),
    };

    layout.push(entitySection);
    return layout;
  },
});

export default __class;
