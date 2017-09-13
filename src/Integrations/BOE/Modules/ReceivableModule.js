/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _Module from './_Module';
import ERPReceivablesDetail from '../Views/ERPReceivables/Detail';
import ERPReceivablesList from '../Views/ERPReceivables/List';
import ERPReceivableItemsList from '../Views/ERPReceivableItems/List';
import '../Models/ErpReceivable/Offline';
import '../Models/ErpReceivable/SData';

const __class = declare('crm.Integrations.BOE.Modules.ReceivableModule', [_Module], {
  defaultViews: ['erpreceivables_list'],
  init: function init() {
  },
  loadViews: function loadViews() {
    const am = this.applicationModule;

    am.registerView(new ERPReceivablesDetail());
    am.registerView(new ERPReceivablesList({
      expose: true,
    }));

    am.registerView(new ERPReceivableItemsList({
      id: 'erpreceivable_items_related',
      expose: false,
    }));
  },
  loadCustomizations: function loadCustomizations() {
    const am = this.applicationModule;

    am.registerCustomization('detail/tools', 'erpreceivables_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'erpreceivables_list', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('list/tools', 'erpreceivable_items_related', {
      at: function at(tool) {
        return tool.id === 'new';
      },
      type: 'remove',
    });

    am.registerCustomization('detail/tools', 'erpreceivable_items_detail', {
      at: function at(tool) {
        return tool.id === 'edit';
      },
      type: 'remove',
    });
  },
  loadToolbars: function loadToolbars() {
  },
});

lang.setObject('icboe.Modules.ReceivableModule', __class);
export default __class;
