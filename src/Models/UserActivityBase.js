import declare from 'dojo/_base/declare';
import ActivityBase from './ActivityBase';
import MODEL_NAMES from './Names';

const resource = window.localeContext.getEntitySync('userActivityModel').attributes;

const __class = declare('crm.Models.UserActivityBase', [ActivityBase], {
  modelName: MODEL_NAMES.USERACTIVITY,
  entityName: 'UserActivity',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'userActivities',
  contractName: 'system',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
