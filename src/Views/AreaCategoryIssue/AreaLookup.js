/* Copyright 2021 Infor
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
import List from 'argos/List';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';
import format from 'crm/Format';

const resource = getResource('areaCategoryIssue_AreaLookup');

const __class = declare('crm.Views.AreaCategoryIssue.AreaLookup', [List], {
  format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.$descriptor %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'areacategoryissue_arealookup',
  modelName: MODEL_NAMES.AREACATEGORYISSUE,
  expose: false,
  enableSearch: false,
  enablePullToRefresh: false,
  isCardView: false,
  _buildQueryExpression: function _buildQueryExpression() {
    return 'area';
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(options) {
    return options;
  },
  getRemainingCount: function getRemainingCount() {
    return 0;
  },
});

export default __class;
