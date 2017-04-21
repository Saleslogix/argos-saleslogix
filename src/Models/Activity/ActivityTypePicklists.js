export const ActivityTypePicklists = {
  atAppointment: {
    Category: 'Meeting Category Codes',
    Description: 'Meeting Regarding',
  },
  atLiterature: {
    Description: 'Lit Request Regarding',
  },
  atPersonal: {
    Category: 'Meeting Category Codes',
    Description: 'Personal Activity Regarding',
  },
  atPhoneCall: {
    Category: 'Phone Call Category Codes',
    Description: 'Phone Call Regarding',
  },
  atToDo: {
    Category: 'To Do Category Codes',
    Description: 'To Do Regarding',
  },
  atEMail: {
    Category: 'E-mail Category Codes',
    Description: 'E-mail Regarding',
  },
};

export function getPicklistByActivityType(type, which) {
  return ActivityTypePicklists[type] && ActivityTypePicklists[type][which];
}

export default ActivityTypePicklists;
