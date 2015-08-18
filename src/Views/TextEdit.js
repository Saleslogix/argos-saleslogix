import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Edit from 'argos/Edit';

/**
 * @class crm.Views.TextEdit
 *
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.TextEdit', [Edit], {
  // View Properties
  id: 'text_edit',
  localeId: 'textEdit',

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: '',
      cls: 'note-text-row',
      name: 'Notes',
      type: 'textarea',
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.TextEdit', __class);
export default __class;
