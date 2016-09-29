import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import domAttr from 'dojo/dom-attr';
import _RightDrawerBaseMixin from './_RightDrawerBaseMixin';
import getResource from 'argos/I18n';

const resource = getResource('speedSearchRightDrawerListMixin');

/**
 * @class crm.Views._SpeedSearchRightDrawerListMixin
 *
 * Speedsearch specific mixin for right drawer functionality.
 *
 * @mixins crm.Views._RightDrawerBaseMixin
 *
 */
const __class = declare('crm.Views._SpeedSearchRightDrawerListMixin', [_RightDrawerBaseMixin], {
  // Localization
  indexSectionText: resource.indexSectionText,

  _hasChangedIndexPrefs: false, // Dirty flag so we know when to reload the widgets

  onShow: function onShow() {
    this.setDefaultIndexPreferences();
  },
  setDefaultIndexPreferences: function setDefaultIndexPreferences() {
    if (!App.preferences.speedSeacrchIndexes) {
      const defaults = this.getDefaultIndexPrefences();
      App.preferences.speedSearchIndexes = defaults;
      App.persistPreferences();
    }
  },
  getDefaultIndexPrefences: function getDefaultIndexPrefences() {
    const defaults = [];
    const self = this;
    array.forEach(this.indexes, (index) => {
      defaults.push({
        indexName: index.indexName,
        enabled: self._isIndexActive(index.indexName),
      });
    });
    return defaults;
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
          if (this._hasChangedIndexPrefs) {
            this.rebuildWidgets();
            this._hasChangedIndexPrefs = false;
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
      indexClicked: lang.hitch(this, function onIndexClicked(params) {
        const prefs = App.preferences && App.preferences.speedSearchIndexes;

        const results = array.filter(prefs, (pref) => {
          return pref.indexName === params.indexname; // the index name is lower cased.
        });
        this.activateIndex(params.indexname);
        if (results.length > 0) {
          const enabled = !!results[0].enabled;
          results[0].enabled = !enabled;
          App.persistPreferences();
          this._hasChangedIndexPrefs = true;
          domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
        }
      }),
    };

    return actions;
  },
  getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
    if (entry.dataProps && entry.dataProps.indexname) {
      return {
        tag: 'view',
        title: resource.indexSectionText,
      };
    }
  },
  createRightDrawerLayout: function createRightDrawerLayout() {
    const layout = [];

    const indexSection = {
      id: 'actions',
      children: [],
    };
    const prefs = App.preferences && App.preferences.speedSearchIndexes;
    if (this.indexes) {
      for (const i in this.indexes) {
        if (this.indexes.hasOwnProperty(i)) {
          let index = this.indexes[i];
          const indexPref = array.filter(prefs, function getIndexPref(pref) { // eslint-disable-line
            return pref.indexName === index.indexName;
          });
          index = this.indexes[i];
          if (index.hasOwnProperty('indexName')) {
            indexSection.children.push({
              name: index.indexName,
              action: 'indexClicked',
              title: this.indexesText[index.indexName] || index.indexName,
              dataProps: {
                indexname: index.indexName,
                enabled: !!indexPref[0].enabled,
              },
            });
          }
        }
      }
    }

    layout.push(indexSection);
    return layout;
  },
});

lang.setObject('Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin', __class);
export default __class;
