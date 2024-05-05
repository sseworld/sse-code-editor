/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../_.contribution"], function (require, exports, __contribution_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (0, __contribution_1.registerLanguage)({
        id: 'handlebars',
        extensions: ['.handlebars', '.hbs'],
        aliases: ['Handlebars', 'handlebars', 'hbs'],
        mimetypes: ['text/x-handlebars-template'],
        loader: function () {
            if (AMD) {
                return new Promise(function (resolve, reject) {
                    require(['vs/basic-languages/handlebars/handlebars'], resolve, reject);
                });
            }
            else {
                return new Promise(function (resolve_1, reject_1) { require(['./handlebars'], resolve_1, reject_1); });
            }
        }
    });
});
//# sourceMappingURL=handlebars.contribution.js.map