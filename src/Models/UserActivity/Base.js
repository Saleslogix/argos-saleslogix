import declare from 'dojo/_base/declare';
import ActivityBase from '../Activity/Base';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('userActivityModel');

const __class = declare('crm.Models.UserActivity.Base', [ActivityBase], {
  modelName: MODEL_NAMES.USERACTIVITY,
  entityName: 'UserActivity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'userActivities',
  contractName: 'system',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
