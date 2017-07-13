import { decode } from 'argos/Format';

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

export function getSalesNavigatorUrl(resourceKind, entity) {
  const promise = new Promise((resolve, reject) => {
    const linkedInConfigurationKind = 'linkedInConfigurations';
    let operationName = null;
    if (resourceKind === 'accounts') {
      operationName = 'GetAccountSalesNavigatorUrl';
    } else if (resourceKind === 'contacts') {
      operationName = 'GetContactSalesNavigatorUrl';
    } else if (resourceKind === 'leads') {
      operationName = 'GetLeadSalesNavigatorUrl';
    }
    const entry = {
      $name: operationName,
      request: {
        entity,
      },
    };
    const request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService(false))
        .setResourceKind(linkedInConfigurationKind)
        .setOperationName(operationName);
    request.execute(entry, {
      success: (data) => {
        let result = '';
        try {
          result = (data && data.response && data.response.Result) ? decode(data.response.Result) : '';
          resolve(result);
        } catch (error) {
          reject(error);
          console.log(error); // eslint-disable-line
        }
      },
      failure: (error) => {
        const response = JSON.parse(error.response)[0];
        reject(response);
      },
    });
  });
  return promise;
}
