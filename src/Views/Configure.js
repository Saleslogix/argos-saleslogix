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
import Memory from 'dojo/store/Memory';
import _ConfigureBase from 'argos/_ConfigureBase';
import getResource from 'argos/I18n';

const resource = getResource('configure');

const __class = declare('crm.Views.Configure', [_ConfigureBase], {
  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'configure',
  idProperty: '$key',
  labelProperty: '$descriptor',

  onSave: function onSave() {
    App.preferences.home = App.preferences.home || {};
    App.preferences.configure = App.preferences.configure || {};

    App.preferences.configure.order = this.getOrderedKeys();
    App.preferences.home.visible = this.getSelectedKeys();

    App.persistPreferences();

    ReUI.back();
    const view = App.getView('left_drawer');
    if (view) {
      view.refresh();
    }
  },
  createStore: function createStore() {
    const exposed = App.getExposedViews();
    const order = this.getSavedOrderedKeys();
    let list = [];

    // De-dup id's
    const all = order.concat(exposed);
    let reduced = all.reduce((previous, current) => {
      if (previous.indexOf(current) === -1) {
        previous.push(current);
      }

      return previous;
    }, []);

    // The order array could have had stale id's, filter out valid views here
    reduced = reduced.filter((key) => {
      const view = App.getView(key);
      return view && typeof view.getSecurity === 'function' && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(key) !== -1;
    });

    list = reduced.map((key) => {
      const view = App.getView(key);
      return {
        $key: view.id,
        $descriptor: view.titleText,
        icon: view.icon,
      };
    });

    return Memory({ // eslint-disable-line
      data: list,
    });
  },
  getSavedOrderedKeys: function getSavedOrderedKeys() {
    return (App.preferences.configure && App.preferences.configure.order) || [];
  },
  getSavedSelectedKeys: function getSavedSelectedKeys() {
    return (App.preferences.home && App.preferences.home.visible) || [];
  },
});

export default __class;
