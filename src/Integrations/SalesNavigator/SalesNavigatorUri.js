const LEAD = 'lead';
const ACCOUNT = 'account';

/**
 * @class
 * Class for creating and managing the Uri for the LinkedIn Sales Navigator Implementation
 * Required Values:
 * @required apiKey
 * @required profile - either lead or account
 * @required crmRecordId
 * @required crmOrgId
 * @required width
 * @required height
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
    this.width = '320px';
    this.height = '360px';
    this.crmRecordId = null;
    this.crmOrgId = 'INFOR';
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
  setWidth(width) {
    this.width = typeof width === 'number' ? `${width}px` : width;
    return this;
  }
  setHeight(height) {
    this.height = typeof height === 'number' ? `${height}px` : height;
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
  /**
   * Sets the URI as a responsive value with a subscribe function to listen to dimension changes
   * @param {*} observable - an object with a function called subscribe that the
   *  URI can listen to in order to adjust its layout based on the passed type.
   *    Subscribe expects to receive the width and height as parameters
   */
  setResponsive(observable) {
    if (observable && observable.subscribe) {
      observable.subscribe((width, height) => {
        if (!width || !height) {
          return;
        }
        this.setWidth(width);
        this.setHeight(height);
      });
    }
    return this;
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
    return `https://static.licdn.com/sc/h/b208wussapvfe318bbcr8o844?${this.build()}`;
  }
}
