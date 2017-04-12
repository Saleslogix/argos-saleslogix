import WidgetTypes from './WidgetTypes';

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

/**
 * Returns the defaults for Sales Navigator Settings
 */
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

/**
 * Computes the size object based on the passed inputs
 * @param {number} width represents the container width
 * @param {string} preference code value of the widget type
 * @return {Object} a size object representing width and height
 */
export function getSizeFromWidthAndPreference(width, preference) {
  const smallWidgetTypePreference = WidgetTypes[preference];
  const getSize = type => ({
    width: WidgetTypes[type].width.minimum,
    height: WidgetTypes[type].height.minimum,
  });

  // Breakpoint functions
  const isTooSmall = value => value < WidgetTypes.simple.width.minimum;
  const isSmallWidgetType = value => value < WidgetTypes.square.width.minimum;
  const isMediumWidgetType = value => value < WidgetTypes.wide.width.minimum;

  if (isTooSmall(width)) {
    console.warn(`Container width is too small for the Sales Navigator Widget... needs ${WidgetTypes.simple.width.minimum}`);
    return;
  }
  if (isSmallWidgetType(width)) {
    return getSize(smallWidgetTypePreference);
  }
  if (isMediumWidgetType(width)) {
    return getSize('square');
  }
  return getSize('wide');
}
