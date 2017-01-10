import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';

const __class = declare('crm.Integrations.BOE.Modules._Module', null, {
  applicationModule: null,
  defaultViews: null,
  constructor: function constructor(applicationModule) {
    this.applicationModule = applicationModule;
  },
  init: function init() {
  },
  initDynamic: function initDynamic() {
  },
  loadViews: function loadViews() {
  },
  loadCustomizations: function loadCustomizations() {
  },
  loadToolbars: function loadToolbars() {
  },
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

lang.setObject('icboe.Modules._Module', __class);
export default __class;
