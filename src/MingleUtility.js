import lang from 'dojo/_base/lang';

/**
 * @class crm.MingleUtility
 *
 * Saleslogix Mingle utils
 *
 * @singleton
 *
 */
const __class = lang.setObject('crm.MingleUtility', {
  accessToken: '',

  refreshAccessToken(appConfig) {
    const hash = location.hash.substring(2);
    let state = '';
    if (hash) {
      state = `/redirectTo/${hash}`;
    }
    this.redirectToMingle(appConfig, state);
  },
  populateAccessToken(appConfig) {
    const hash = location.hash.substring(1);
    if (hash) {
      const result = hash.split('&').reduce((values, item) => {
        const parts = item.split('=');
        values[parts[0]] = parts[1];
        return values;
      }, {});

      if (result.access_token) {
        this.accessToken = result.access_token;
        if (result.expires_in) {
          result.expires_in = '63'; // Todo remove this line - just to test refresh *******************************************
          const self = this;
          setTimeout(
              () => { self.refreshAccessToken(appConfig); }, // Get new access_token before 60 secs of expiry
              (result.expires_in - 60) * 1000 * 60
          );
        }
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
