define('crm/Views/Offline/_OfflineRightDrawerListMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/dom-attr', '../_RightDrawerBaseMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseLang, _dojoDomAttr, _RightDrawerBaseMixin2) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _RightDrawerBaseMixin3 = _interopRequireDefault(_RightDrawerBaseMixin2);

  var mixinName = 'crm.Views.Offline._OfflineRightDrawerListMixin';

  /**
   * @class crm.Views._SpeedSearchRightDrawerListMixin
   *
   * Speedsearch specific mixin for right drawer functionality.
   *
   * @mixins crm.Views._RightDrawerBaseMixin
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Offline._OfflineRightDrawerListMixin', [_RightDrawerBaseMixin3['default']], {
    // Localization
    entitySectionText: 'Entity',

    _hasChangedEntityPrefs: false, // Dirty flag so we know when to reload the widgets

    onShow: function onShow() {
      this.setDefaultEntityPreferences();
    },
    setDefaultEntityPreferences: function setDefaultEntityPreferences() {
      if (!App.preferences.offlineEntityFilters) {
        var defaults = this.getDefaultEntityPreferences();
        App.preferences.offlineEntityFilters = defaults;
        App.persistPreferences();
      }
    },
    getDefaultEntityPreferences: function getDefaultEntityPreferences() {
      return Object.keys(this.entityMappings).map(function (name) {
        return {
          name: name,
          enabled: true
        };
      });
    },
    setupRightDrawer: function setupRightDrawer() {
      var drawer = App.getView('right_drawer');
      if (drawer) {
        _lang['default'].mixin(drawer, this._createActions());
        drawer.setLayout(this.createRightDrawerLayout());
        drawer.getGroupForEntry = _lang['default'].hitch(this, function getGroupForRightDrawerEntry(entry) {
          return this.getGroupForRightDrawerEntry(entry);
        });

        if (this.rebuildWidgets) {
          App.snapper.on('close', _lang['default'].hitch(this, function onSnapperClose() {
            if (this._hasChangedEntityPrefs) {
              this.rebuildWidgets();
              this._hasChangedEntityPrefs = false;
            }
          }));
        }
      }
    },
    unloadRightDrawer: function unloadRightDrawer() {
      var drawer = App.getView('right_drawer');
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
      var actions = {
        entityFilterClicked: _lang['default'].hitch(this, function onentityFilterClicked(params) {
          var prefs = App.preferences && App.preferences.offlineEntityFilters;

          var results = _array['default'].filter(prefs, function getResults(pref) {
            return pref.name === params.entityname;
          });
          this.activateEntityFilter(params.entityname);
          if (results.length > 0) {
            var enabled = !!results[0].enabled;
            results[0].enabled = !enabled;
            App.persistPreferences();
            this._hasChangedEntityPrefs = true;
            _domAttr['default'].set(params.$source, 'data-enabled', (!enabled).toString());
          }
        })
      };

      return actions;
    },
    getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry(entry) {
      if (entry.dataProps && entry.dataProps.entityname) {
        var mixin = _lang['default'].getObject(mixinName);
        return {
          tag: 'view',
          title: mixin.prototype.entitySectionText
        };
      }
    },
    createRightDrawerLayout: function createRightDrawerLayout() {
      var _this = this;

      var layout = [];
      var entitySection = {
        id: 'actions',
        children: Object.keys(this.entityMappings).map(function (entityName) {
          var prefs = App.preferences && App.preferences.offlineEntityFilters;
          var entityPref = _array['default'].filter(prefs, function (pref) {
            return pref.name === entityName;
          });

          var _entityPref = _slicedToArray(entityPref, 1);

          var enabled = _entityPref[0];

          return {
            'name': entityName,
            'action': 'entityFilterClicked',
            'title': _this.entityText[entityName] || entityName,
            'dataProps': {
              'entityname': entityName,
              'enabled': !!enabled
            }
          };
        })
      };

      layout.push(entitySection);
      return layout;
    }
  });

  module.exports = __class;
});
