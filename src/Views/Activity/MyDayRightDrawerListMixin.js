import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import domAttr from 'dojo/dom-attr';
import _RightDrawerBaseMixin from '../_RightDrawerBaseMixin';


const mixinName = 'crm.Views.Activity.MyDayRightDrawerListMixin';

/**
 * @class crm.Views.MyDayRightDrawerListMixin
 *
 *
 * @mixins crm.Views._RightDrawerBaseMixin
 *
 */
const __class = declare('crm.Views.Activity.MyDayRightDrawerListMixin', [_RightDrawerBaseMixin], {
  // Localization
  kpiSectionText: 'KPI',

  // Dirty flags to refresh the mainview and/or widgets
  _hasChangedKPIPrefs: false,
  setupRightDrawer: function setupRightDrawer() {
    const drawer = App.getView('right_drawer');
    if (drawer) {
      lang.mixin(drawer, this._createActions());
      drawer.setLayout(this.createRightDrawerLayout());
      drawer.getGroupForEntry = lang.hitch(this, function getGroupForRightDrawerEntry(entry) {
        return this.getGroupForRightDrawerEntry(entry);
      });

      App.snapper.on('close', lang.hitch(this, function onSnapperClose() {
        if (this._hasChangedKPIPrefs && this.rebuildWidgets) {
          this.metricWidgetsBuilt = false;
          this.rebuildWidgets();
          this._hasChangedKPIPrefs = false;
        }
      }));
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
      kpiClicked: function kpiClicked(params) {
        const metrics = this.getMetrics();
        let results;

        if (metrics.length > 0) {
          results = array.filter(metrics, function setMetricTitle(metric) {
            return metric.title === params.title;
          });
        }

        if (results.length > 0) {
          const enabled = !!results[0].enabled;
          results[0].enabled = !enabled;
          App.persistPreferences();
          this._hasChangedKPIPrefs = true;

          domAttr.set(params.$source, 'data-enabled', (!enabled).toString());
        }
      }.bind(this),
    };

    return actions;
  },
  getMetrics: function getMetrics() {
    return App.getMetricsByResourceKind('userActivities');
  },
  getGroupForRightDrawerEntry: function getGroupForRightDrawerEntry() {
    const mixin = lang.getObject(mixinName);
    return {
      tag: 'kpi',
      title: mixin.prototype.kpiSectionText,
    };
  },
  createRightDrawerLayout: function createRightDrawerLayout() {
    const layout = [];
    const metrics = this.getMetrics();

    const kpiSection = {
      id: 'kpi',
      children: metrics.filter((m) => m.title).map((metric, i) => {
        return {
          'name': 'KPI' + i,
          'action': 'kpiClicked',
          'title': metric.title,
          'dataProps': {
            'title': metric.title,
            'enabled': !!metric.enabled,
          },
        };
      }),
    };

    layout.push(kpiSection);
    return layout;
  },
});

export default __class;
