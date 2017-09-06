import lang from 'dojo/_base/lang';
import 'dojo/sniff';
import getResource from 'argos/I18n';


/**
 * @class crm.MingleUtility
 * @singleton
 */
const __class = lang.setObject('crm.MingleUtility', {
  accessToken: '',

  refreshAccessToken(appConfig) {
    if (!App.isOnline()) {
      App.requiresMingleRefresh = true;
      return;
    }

    const hash = 'mingleRefresh'; // location.hash.substring(2);
    let state = '';
    if (hash) {
      state = `/redirectTo/${hash}`;
    }
    this.redirectToMingle(appConfig, state);
  },
  populateAccessToken(appConfig) {
    const hash = location.hash.substring(1);
    let result;
    if (hash) {
      result = hash.split('&').reduce((values, item) => {
        const parts = item.split('=');
        values[parts[0]] = parts[1];
        return values;
      }, {});

      if (result.access_token) {
        this.accessToken = result.access_token;
        if (result.expires_in) {
          // result.expires_in = '420'; // Refresh Test
          setTimeout(() => {
            const resource = getResource('mingle');
            App.toast.add({ message: resource.refreshText, title: resource.refreshTitle, toastTime: 300 * 1000, showProgressBar: true });
            setTimeout(() => { this.refreshAccessToken(appConfig); }, 300 * 1000);
            // Show message to user before 5 minutes of refresh (300 seconds)
          }, (result.expires_in - 300) * 1000);
        }
      }
    }

    if (result) {
      if (result.access_token || result.error) {
        return result;
      }
    }

    this.redirectToMingle(appConfig, hash);
  },
  redirectToMingle(appConfig, state) {
    const authorizationUrl = appConfig.mingleSettings.pu + appConfig.mingleSettings.oa;
    const redirectURI = appConfig.mingleRedirectUrl;
    const clientId = appConfig.mingleSettings.ci;
    const responseType = 'token';
    const url =
           `${authorizationUrl}?` +
           `client_id=${encodeURI(clientId)}&` +
           `redirect_uri=${encodeURI(redirectURI)}&` +
           `response_type=${encodeURI(responseType)}&` +
           `state=${encodeURI(state)}&` +
           'include_granted_scopes=false';
    window.location = url;
  },
});
export default __class;
