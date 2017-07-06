export const SalesNavigatorStorageKey = 'crm_sales_navigator_settings';

/**
 * Creates an empty script using the global document. Has a asJavascript function
 * attached to set the type to 'text/javascript'
 */
export function createEmptyIFrame() {
  const iframe = document.createElement('iframe');
  iframe.classList.add('salesnavigator-iframe');
  return iframe;
}
