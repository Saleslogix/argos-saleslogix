export const SalesNavigatorStorageKey = 'crm_sales_navigator_settings';

/**
 * Creates an empty script using the global document. Has a asJavascript function
 * attached to set the type to 'text/javascript'
 */
export function createEmptyScript() {
  const script = document.createElement('script');
  script.asJavascript = function asJavascript() {
    this.type = 'text/javascript';
    return this;
  };
  return script;
}

/**
 * Fetches the settings from localStorage
 * @returns settings object
 */
export function getSettings() {
  const settings = localStorage.getItem(SalesNavigatorStorageKey);
  if (settings) {
    return JSON.parse(settings);
  }
  return false;
}

/**
 * Saves the settings, taking in a settings object as the parameter
 * @param settings - settings object
 */
export function setSettings(settings) {
  localStorage.setItem(SalesNavigatorStorageKey, JSON.stringify(settings));
}

export function defaultSettings() {
  return {
    accounts: {
      isResponsive: true,
      smallWidgetType: 'simple',
    },
    contacts: {
      isResponsive: true,
      smallWidgetType: 'simple',
    },
    leads: {
      isResponsive: true,
      smallWidgetType: 'simple',
    },
  };
}
