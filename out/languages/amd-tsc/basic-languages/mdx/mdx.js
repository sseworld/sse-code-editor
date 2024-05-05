/*---------------------------------------------------------------------------------------------
 *	Copyright (c) SSE World. All rights reserved.
 *	Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "../../fillers/sse-editor-core"], function (require, exports, sse_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.language = exports.conf = void 0;
    exports.conf = {
        comments: {
            blockComment: ['{/*', '*/}']
        },
        brackets: [['{', '}']],
        autoClosingPairs: [
            { open: '"', close: '"' },
            { open: "'", close: "'" },
            { open: '“', close: '”' },
            { open: '‘', close: '’' },
            { open: '`', close: '`' },
            { open: '{', close: '}' },
            { open: '(', close: ')' },
            { open: '_', close: '_' },
            { open: '**', close: '**' },
            { open: '<', close: '>' }
        ],
        onEnterRules: __spreadArray([
            {
                beforeText: /^\s*- .+/,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.None, appendText: '- ' }
            },
            {
                beforeText: /^\s*\+ .+/,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.None, appendText: '+ ' }
            },
            {
                beforeText: /^\s*\* .+/,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.None, appendText: '* ' }
            },
            {
                beforeText: /^> /,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.None, appendText: '> ' }
            },
            {
                beforeText: /<\w+/,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.Indent }
            },
            {
                beforeText: /\s+>\s*$/,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.Indent }
            },
            {
                beforeText: /<\/\w+>/,
                action: { indentAction: sse_editor_core_1.languages.IndentAction.Outdent }
            }
        ], Array.from({ length: 100 }, function (_, index) { return ({
            beforeText: new RegExp("^".concat(index, "\\. .+")),
            action: { indentAction: sse_editor_core_1.languages.IndentAction.None, appendText: "".concat(index + 1, ". ") }
        }); }), true)
    };
    exports.language = {
        defaultToken: '',
        tokenPostfix: '.mdx',
        control: /[!#()*+.[\\\]_`{}\-]/,
        escapes: /\\@control/,
        tokenizer: {
            root: [
                [/^---$/, { token: 'meta.content', next: '@frontmatter', nextEmbedded: 'yaml' }],
                [/^\s*import/, { token: 'keyword', next: '@import', nextEmbedded: 'js' }],
                [/^\s*export/, { token: 'keyword', next: '@export', nextEmbedded: 'js' }],
                [/<\w+/, { token: 'type.identifier', next: '@jsx' }],
                [/<\/?\w+>/, 'type.identifier'],
                [
                    /^(\s*)(>*\s*)(#{1,6}\s)/,
                    [{ token: 'white' }, { token: 'comment' }, { token: 'keyword', next: '@header' }]
                ],
                [/^(\s*)(>*\s*)([*+-])(\s+)/, ['white', 'comment', 'keyword', 'white']],
                [/^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/, ['white', 'comment', 'number', 'white']],
                [/^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/, ['white', 'comment', 'number', 'white']],
                [/^(\s*)(>*\s*)(-{3,}|\*{3,}|_{3,})$/, ['white', 'comment', 'keyword']],
                [/`{3,}(\s.*)?$/, { token: 'string', next: '@codeblock_backtick' }],
                [/~{3,}(\s.*)?$/, { token: 'string', next: '@codeblock_tilde' }],
                [
                    /`{3,}(\S+).*$/,
                    { token: 'string', next: '@codeblock_highlight_backtick', nextEmbedded: '$1' }
                ],
                [
                    /~{3,}(\S+).*$/,
                    { token: 'string', next: '@codeblock_highlight_tilde', nextEmbedded: '$1' }
                ],
                [/^(\s*)(-{4,})$/, ['white', 'comment']],
                [/^(\s*)(>+)/, ['white', 'comment']],
                { include: 'content' }
            ],
            content: [
                [
                    /(\[)(.+)(]\()(.+)(\s+".*")(\))/,
                    ['', 'string.link', '', 'type.identifier', 'string.link', '']
                ],
                [/(\[)(.+)(]\()(.+)(\))/, ['', 'type.identifier', '', 'string.link', '']],
                [/(\[)(.+)(]\[)(.+)(])/, ['', 'type.identifier', '', 'type.identifier', '']],
                [/(\[)(.+)(]:\s+)(\S*)/, ['', 'type.identifier', '', 'string.link']],
                [/(\[)(.+)(])/, ['', 'type.identifier', '']],
                [/`.*`/, 'variable.source'],
                [/_/, { token: 'emphasis', next: '@emphasis_underscore' }],
                [/\*(?!\*)/, { token: 'emphasis', next: '@emphasis_asterisk' }],
                [/\*\*/, { token: 'strong', next: '@strong' }],
                [/{/, { token: 'delimiter.bracket', next: '@expression', nextEmbedded: 'js' }]
            ],
            import: [[/'\s*(;|$)/, { token: 'string', next: '@pop', nextEmbedded: '@pop' }]],
            expression: [
                [/{/, { token: 'delimiter.bracket', next: '@expression' }],
                [/}/, { token: 'delimiter.bracket', next: '@pop', nextEmbedded: '@pop' }]
            ],
            export: [[/^\s*$/, { token: 'delimiter.bracket', next: '@pop', nextEmbedded: '@pop' }]],
            jsx: [
                [/\s+/, ''],
                [/(\w+)(=)("(?:[^"\\]|\\.)*")/, ['attribute.name', 'operator', 'string']],
                [/(\w+)(=)('(?:[^'\\]|\\.)*')/, ['attribute.name', 'operator', 'string']],
                [/(\w+(?=\s|>|={|$))/, ['attribute.name']],
                [/={/, { token: 'delimiter.bracket', next: '@expression', nextEmbedded: 'js' }],
                [/>/, { token: 'type.identifier', next: '@pop' }]
            ],
            header: [
                [/.$/, { token: 'keyword', next: '@pop' }],
                { include: 'content' },
                [/./, { token: 'keyword' }]
            ],
            strong: [
                [/\*\*/, { token: 'strong', next: '@pop' }],
                { include: 'content' },
                [/./, { token: 'strong' }]
            ],
            emphasis_underscore: [
                [/_/, { token: 'emphasis', next: '@pop' }],
                { include: 'content' },
                [/./, { token: 'emphasis' }]
            ],
            emphasis_asterisk: [
                [/\*(?!\*)/, { token: 'emphasis', next: '@pop' }],
                { include: 'content' },
                [/./, { token: 'emphasis' }]
            ],
            frontmatter: [[/^---$/, { token: 'meta.content', nextEmbedded: '@pop', next: '@pop' }]],
            codeblock_highlight_backtick: [
                [/\s*`{3,}\s*$/, { token: 'string', next: '@pop', nextEmbedded: '@pop' }],
                [/.*$/, 'variable.source']
            ],
            codeblock_highlight_tilde: [
                [/\s*~{3,}\s*$/, { token: 'string', next: '@pop', nextEmbedded: '@pop' }],
                [/.*$/, 'variable.source']
            ],
            codeblock_backtick: [
                [/\s*`{3,}\s*$/, { token: 'string', next: '@pop' }],
                [/.*$/, 'variable.source']
            ],
            codeblock_tilde: [
                [/\s*~{3,}\s*$/, { token: 'string', next: '@pop' }],
                [/.*$/, 'variable.source']
            ]
        }
    };
});
//# sourceMappingURL=mdx.js.map