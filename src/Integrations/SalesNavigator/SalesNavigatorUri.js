const LEAD = 'lead';
const ACCOUNT = 'account';

/**
 * @class
 * Class for creating and managing the Uri for the LinkedIn Sales Navigator Implementation
 * Required Values:
 * @required apiKey
 * @required profile - either lead or account
 * @required crmRecordId
 * @required crmOrganizationId
 * @required crmSourceType
 *
 * Optional Values:
 * firstName - Only valid for lead profile. Used to find the most relevant person based on first name.
 * lastName - Only valid for lead profile. Used to find the most relevant person based on last name.
 * email - Only valid for lead profile. Used to find the most relevant person based on email.
 * companyName - Valid for both lead and account profile. Used to find the most relevant person or company based on company name.
 * companyWebsite - Valid for both lead and account profile. Used to find the most relevant person or company based on company website.
 * modules - A comma separated list representing the profile card and the tabs in the widget. The valid values for lead:
      TopCard
      Icebreakers
      GetIntroduced
      RelatedLeads

      The valid values for account:
      TopCard
      Connections
      RecommendedLeads
      News

      If no module is specified or the parameter is missing, then all the modules of the selected profile will be rendered.
 *
 */
export default class SalesNavigatorUri {
  constructor(key) {
    // if (!key) {
    //   console.error('Expected an apikey for the SalesNavigatorUri'); // eslint-disable-line
    //   return;
    // }
    this.apiKey = key || '789tfhvrjq81yf';
    this.profile = 'lead';
    this.crmRecordId = null;
    this.crmOrganizationId = 'INFOR';
    this.crmSourceType = 'INFOR';
  }
  asLead() {
    this.profile = LEAD;
    return this;
  }
  asAccount() {
    this.profile = ACCOUNT;
    return this;
  }
  setFirstName(name) {
    if (this.profile !== LEAD) {
      console.warn(`Unnecessary call to setFirstName as profile is ${this.profile}... Expected ${LEAD}`); // eslint-disable-line
      return this;
    }
    this.firstName = name;
    return this;
  }
  setLastName(name) {
    if (this.profile !== LEAD) {
      console.warn(`Unnecessary call to setLastName as profile is ${this.profile}... Expected ${LEAD}`); // eslint-disable-line
      return this;
    }
    this.lastName = name;
    return this;
  }
  setEmail(email) {
    if (this.profile !== LEAD) {
      console.warn(`Unnecessary call to setLastName as profile is ${this.profile}... Expected ${LEAD}`); // eslint-disable-line
      return this;
    }
    this.email = email;
    return this;
  }
  setCompanyName(name) {
    this.companyName = name;
    return this;
  }
  setCompanyWebsite(url) {
    this.companyWebsite = url;
    return this;
  }
  setModules(modules) {
    this.modules = modules;
    return this;
  }
  setRecordId(id) {
    this.crmRecordId = id;
    return this;
  }
  setOrgId(id) {
    this.crmOrgId = id;
    return this;
  }
  getModule() {
    if (this.profile === LEAD) {
      return 'profile-matching';
    }
    if (this.profile === ACCOUNT) {
      return 'company-matching';
    }
    return '';
  }
  build() {
    const builder = {
      str: '',
      ifExistsAdd(prop, val) {
        if (val) {
          if (this.str) {
            this.str = `${this.str}&${encodeURI(prop)}=${encodeURIComponent(val)}`;
          } else {
            this.str = `${encodeURI(prop)}=${encodeURIComponent(val)}`;
          }
        }
      },
    };

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        builder.ifExistsAdd(prop, this[prop]);
      }
    }
    return builder.str;
  }
  toString() {
    return `https://www.linkedin.com/sales/widget/${this.getModule()}?from=crm&${this.build()}`;
  }
}
