/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Utility provides functions that are more javascript enhancers than application related code.
 * @alternateClassName utility
 * @singleton
 */
define('Mobile/SalesLogix/Utility', [
    'dojo/_base/lang'
], function(
    lang
) {
    return lang.setObject('Mobile.SalesLogix.Utility', {
        expand: function(scope, expression) {
            if (typeof expression === 'function')
                return expression.apply(scope, Array.prototype.slice.call(arguments, 2));
            else
                return expression;
        }
    });
});
