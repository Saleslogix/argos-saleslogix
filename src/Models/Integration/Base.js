import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';


const __class = declare('crm.Models.Integration.Base', [_ModelBase], {
  resourceKind: 'integrations',
  entityName: 'Integration',
  modelName: MODEL_NAMES.INTEGRATION,
});
export default __class;
