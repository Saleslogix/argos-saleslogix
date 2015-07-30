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
var __class = declare('crm.Views.TextEdit', [Edit], {
  //View Properties
  id: 'text_edit',
  titleText: 'Edit Text',

  createLayout: function() {
    return this.layout || (this.layout = [{
      label: '',
      cls: 'note-text-row',
      name: 'Notes',
      type: 'textarea'
    }]);
  }
});

lang.setObject('Mobile.SalesLogix.Views.TextEdit', __class);
export default __class;
