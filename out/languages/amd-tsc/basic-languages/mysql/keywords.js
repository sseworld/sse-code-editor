"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var fs = require('fs');
var path = require('path');
var keywords = getMySQLKeywords();
keywords.sort();
console.log("'".concat(keywords.join("',\n'"), "'"));
function getMySQLKeywords() {
    // https://dev.mysql.com/doc/refman/8.0/en/keywords.html
    var lines = fs
        .readFileSync(path.join(__dirname, 'keywords.mysql.txt'))
        .toString()
        .split(/\r\n|\r|\n/);
    var tokens = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        // Treat ; as a comment marker
        line = line.replace(/;.*$/, '');
        line = line.trim();
        // Only consider reserved keywords
        if (!/ \(R\)$/.test(line)) {
            continue;
        }
        line = line.replace(/ \(R\)$/, '');
        tokens.push(line);
    }
    return tokens;
}
//# sourceMappingURL=keywords.js.map