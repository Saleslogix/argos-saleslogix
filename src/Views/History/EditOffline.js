import declare from 'dojo/_base/declare';
import _EditBase from 'argos/_EditBase';
import MODEL_TYPES from 'argos/Models/Types';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('historyEditOffline');

const __class = declare('crm.Views.History.EditOffline', [_EditBase], {
  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'history_edit_offline',
  entityName: 'History',
  resourceKind: 'history',

  getModel: function getModel() {
    const model = App.ModelManager.getModel(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE);
    return model;
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: resource.notesSectionText,
      name: 'NotesSection',
      children: [{
        name: 'Text',
        property: 'Text',
        label: resource.notesLabelText,
        cls: 'row-edit-text',
        type: 'textarea',
        autoFocus: true,
      }, {
        name: 'UID',
        property: 'UID',
        type: 'hidden',
      }],
    }]);
  },
  beforeTransitionTo: function beforeTransitionTo() {
    this.inherited(arguments);
    $(this.domNode).removeClass('panel-loading');
  },
  onTransitionTo: function onTransitionTo() {
    this.inherited(arguments);
    if (this.options.insert) {
      const now = Date.now();
      this.fields.UID.setValue(now);
    }
  },
});

export default __class;
