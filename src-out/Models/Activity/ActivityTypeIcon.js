define('crm/Models/Activity/ActivityTypeIcon', ['module', 'exports'], function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    atToDo: 'bullet-list',
    atPhoneCall: 'phone',
    atAppointment: 'calendar',
    atLiterature: 'calendar',
    atPersonal: 'checkbox',
    atQuestion: 'help',
    event: 'calendar',
    atNote: 'document2',
    atEMail: 'mail'
  };
  module.exports = exports['default'];
});