import Format from 'argos/Format';

const LEAD = 'lead';
const ACCOUNT = 'account';

/**
 * @class
 * Class for creating and managing the Uri for the LinkedIn Sales Navigator Implementation
 * Required Values:
 * @required apiKey
 * @required profile - either lead or account
 * @required crmRecordId
 * @required crmOrdId
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
    this.crmRecordId = 'ABC123';
    this.crmOrgId = 'DEF456';
    // Layout values in 'px'
    this.responsiveLayout = {
      account: {
        simple: {
          width: {
            minimum: 320,
            maximum: 638,
          },
          height: {
            minimum: 360,
          },
        },
        mini: {
          width: {
            minimum: 320,
            maximum: 638,
          },
          height: {
            minimum: 516,
          },
        },
        tall: {
          width: {
            minimum: 320,
            maximum: 638,
          },
          height: {
            minimum: 820,
          },
        },
        square: {
          width: {
            minimum: 640,
            maximum: 962,
          },
          height: {
            minimum: 524,
          },
        },
        wide: {
          width: {
            minimum: 944,
            maximum: 1680,
          },
          height: {
            minimum: 524,
          },
        },
      },
      lead: {
        simple: {
          width: {
            minimum: 320,
            maximum: 638,
          },
          height: {
            minimum: 360,
          },
        },
        mini: {
          width: {
            minimum: 320,
            maximum: 638,
          },
          height: {
            minimum: 516, // Could also be 404
          },
        },
        tall: {
          width: {
            minimum: 320,
            maximum: 638,
          },
          height: {
            minimum: 820,
          },
        },
        square: {
          width: {
            minimum: 640,
            maximum: 962,
          },
          height: {
            minimum: 524,
          },
        },
        wide: {
          width: {
            minimum: 944,
            maximum: 1680,
          },
          height: {
            minimum: 524,
          },
        },
      },
    };
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
  build() {
    const builder = {
      str: '',
      ifExistsAdd(prop, val) {
        if (val) {
          if (this.str) {
            this.str = `${this.str}&${prop}=${val}`;
          } else {
            this.str = `${prop}=${val}`;
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
    return Format.encode(`https://static.licdn.com/sc/h/b208wussapvfe318bbcr8o844?${this.build()}`);
  }
}
