/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'powerquery',
        extensions: ['.pq', '.pqm'],
        aliases: ['PQ', 'M', 'Power Query', 'Power Query M'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/powerquery/powerquery'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./powerquery'], resolve_1, reject_1); });
            }
        }
    });
});
//# sourceMappingURL=powerquery.contribution.js.map