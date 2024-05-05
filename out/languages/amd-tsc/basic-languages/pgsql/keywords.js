"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var fs = require('fs');
var path = require('path');
var keywords = getPostgreSQLKeywords();
keywords.sort();
console.log("'".concat(keywords.join("',\n'"), "'"));
function getPostgreSQLKeywords() {
    // https://www.postgresql.org/docs/current/sql-keywords-appendix.html
    var lines = fs
        .readFileSync(path.join(__dirname, 'keywords.postgresql.txt'))
        .toString()
        .split(/\r\n|\r|\n/);
    var tokens = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var pieces = line.split(/\t/);
        if (/non-reserved/.test(pieces[1])) {
            continue;
        }
        if (/reserved/.test(pieces[1])) {
            tokens.push(pieces[0]);
        }
    }
    return tokens;
}
//# sourceMappingURL=keywords.js.map