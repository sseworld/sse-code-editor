/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../test/testRunner"], function (require, exports, testRunner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function testTokenization(_language, tests) {
        tests = tests.map(function (t) {
            return t.map(function (t) {
                return {
                    line: t.line.replace(/\n/g, ' '),
                    tokens: t.tokens
                };
            });
        });
        (0, testRunner_1.testTokenization)(_language, tests);
    }
    testTokenization('azcli', [
        // Comment single line
        [
            {
                line: '#',
                tokens: [{ startIndex: 0, type: 'comment.azcli' }]
            }
        ],
        [
            {
                line: '# az find -q secret',
                tokens: [{ startIndex: 0, type: 'comment.azcli' }]
            }
        ],
        [
            {
                line: '    # az find -q secret',
                tokens: [
                    { startIndex: 0, type: 'keyword.azcli' },
                    { startIndex: 4, type: 'comment.azcli' }
                ]
            }
        ],
        [
            {
                line: '#az find -q secret',
                tokens: [{ startIndex: 0, type: 'comment.azcli' }]
            }
        ],
        // Other cases
        [
            {
                line: 'az find -q secret',
                tokens: [
                    { startIndex: 0, type: 'keyword.azcli' },
                    { startIndex: 7, type: 'key.identifier.azcli' },
                    { startIndex: 11, type: 'string.azcli' }
                ]
            }
        ],
        [
            {
                line: '',
                tokens: []
            }
        ],
        [
            {
                line: ' ',
                tokens: [{ startIndex: 0, type: 'keyword.azcli' }]
            }
        ],
        [
            {
                line: '--assignee',
                tokens: [{ startIndex: 0, type: 'key.identifier.azcli' }]
            }
        ],
        [
            {
                line: '    --service-principal',
                tokens: [
                    { startIndex: 0, type: 'keyword.azcli' },
                    { startIndex: 3, type: 'key.identifier.azcli' }
                ]
            }
        ],
        [
            {
                line: 'az ad sp create-for-rb  --name ServicePrincipalName --password PASSWORD',
                tokens: [
                    { startIndex: 0, type: 'keyword.azcli' },
                    { startIndex: 23, type: 'key.identifier.azcli' },
                    { startIndex: 31, type: 'string.azcli' },
                    { startIndex: 52, type: 'key.identifier.azcli' },
                    { startIndex: 63, type: 'string.azcli' }
                ]
            }
        ],
        [
            {
                line: '--name!~`"$%^&*(|/.,-=+',
                tokens: [{ startIndex: 0, type: 'key.identifier.azcli' }]
            }
        ],
        [
            {
                line: '--name#some comment',
                tokens: [
                    { startIndex: 0, type: 'key.identifier.azcli' },
                    { startIndex: 6, type: 'comment.azcli' }
                ]
            }
        ],
        [
            {
                line: '--query osPro ``````',
                tokens: [
                    { startIndex: 0, type: 'key.identifier.azcli' },
                    { startIndex: 8, type: 'string.azcli' }
                ]
            }
        ],
        [
            {
                line: 'az ad sp create-for-rbac',
                tokens: [{ startIndex: 0, type: 'keyword.azcli' }]
            }
        ],
        [
            {
                line: '123456789',
                tokens: [{ startIndex: 0, type: 'keyword.azcli' }]
            }
        ],
        [
            {
                line: '- abc',
                tokens: [
                    { startIndex: 0, type: 'key.identifier.azcli' },
                    { startIndex: 2, type: 'string.azcli' }
                ]
            }
        ],
        [
            {
                line: '- @!$()',
                tokens: [
                    { startIndex: 0, type: 'key.identifier.azcli' },
                    { startIndex: 2, type: 'string.azcli' }
                ]
            }
        ],
        [
            {
                line: '""',
                tokens: [{ startIndex: 0, type: 'keyword.azcli' }]
            }
        ],
        [
            {
                line: '// some text',
                tokens: [{ startIndex: 0, type: 'keyword.azcli' }]
            }
        ],
        [
            {
                line: "'APP_ID'",
                tokens: [{ startIndex: 0, type: 'keyword.azcli' }]
            }
        ]
    ]);
});
//# sourceMappingURL=azcli.test.js.map