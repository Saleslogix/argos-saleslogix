import declare from 'dojo/_base/declare';

const __class = declare('crm.Integrations.SalesNavigator.Modules._Module', null, {
  applicationModule: null,
  defaultViews: null,
  constructor: function constructor(applicationModule) {
    this.applicationModule = applicationModule;
  },
  init: function init() {},
  initDynamic: function initDynamic() {},
  loadViews: function loadViews() {},
  loadCustomizations: function loadCustomizations() {},
  loadToolbars: function loadToolbars() {},
  registerDefaultViews: function registerDefaultViews(views) {
    if (this.defaultViews && views) {
      this.defaultViews.forEach((defaultView) => {
        const idx = views.indexOf(defaultView);
        if (idx === -1) {
          views.push(defaultView);
        }
      });
    }
  },
});

export default __class;
