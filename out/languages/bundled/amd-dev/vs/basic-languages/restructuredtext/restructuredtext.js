/*!-----------------------------------------------------------------------------
 * Copyright (c) SSE World. All rights reserved.
 * Version: 1.0.0(0a8ae934ef197f533a1dfc2709984aaf6061d2a1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/restructuredtext/restructuredtext", ["require"],(require)=>{
"use strict";
var moduleExports = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/basic-languages/restructuredtext/restructuredtext.ts
  var restructuredtext_exports = {};
  __export(restructuredtext_exports, {
    conf: () => conf,
    language: () => language
  });
  var conf = {
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">", notIn: ["string"] }
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "`", close: "`" }
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*<!--\\s*#?region\\b.*-->"),
        end: new RegExp("^\\s*<!--\\s*#?endregion\\b.*-->")
      }
    }
  };
  var language = {
    defaultToken: "",
    tokenPostfix: ".rst",
    control: /[\\`*_\[\]{}()#+\-\.!]/,
    escapes: /\\(?:@control)/,
    empty: [
      "area",
      "base",
      "basefont",
      "br",
      "col",
      "frame",
      "hr",
      "img",
      "input",
      "isindex",
      "link",
      "meta",
      "param"
    ],
    alphanumerics: /[A-Za-z0-9]/,
    simpleRefNameWithoutBq: /(?:@alphanumerics[-_+:.]*@alphanumerics)+|(?:@alphanumerics+)/,
    simpleRefName: /(?:`@phrase`|@simpleRefNameWithoutBq)/,
    phrase: /@simpleRefNameWithoutBq(?:\s@simpleRefNameWithoutBq)*/,
    citationName: /[A-Za-z][A-Za-z0-9-_.]*/,
    blockLiteralStart: /(?:[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]|[\s])/,
    precedingChars: /(?:[ -:/'"<([{])/,
    followingChars: /(?:[ -.,:;!?/'")\]}>]|$)/,
    punctuation: /(=|-|~|`|#|"|\^|\+|\*|:|\.|'|_|\+)/,
    tokenizer: {
      root: [
        //sections
        [/^(@punctuation{3,}$){1,1}?/, "keyword"],
        //line-blocks
        //No rules on it
        //bullet-lists
        [/^\s*([\*\-+‣•]|[a-zA-Z0-9]+\.|\([a-zA-Z0-9]+\)|[a-zA-Z0-9]+\))\s/, "keyword"],
        //literal-blocks
        [/([ ]::)\s*$/, "keyword", "@blankLineOfLiteralBlocks"],
        [/(::)\s*$/, "keyword", "@blankLineOfLiteralBlocks"],
        { include: "@tables" },
        { include: "@explicitMarkupBlocks" },
        { include: "@inlineMarkup" }
      ],
      explicitMarkupBlocks: [
        //citations
        { include: "@citations" },
        //footnotes
        { include: "@footnotes" },
        //directives
        [
          /^(\.\.\s)(@simpleRefName)(::\s)(.*)$/,
          [{ token: "", next: "subsequentLines" }, "keyword", "", ""]
        ],
        //hyperlink-targets
        [
          /^(\.\.)(\s+)(_)(@simpleRefName)(:)(\s+)(.*)/,
          [{ token: "", next: "hyperlinks" }, "", "", "string.link", "", "", "string.link"]
        ],
        //anonymous-hyperlinks
        [
          /^((?:(?:\.\.)(?:\s+))?)(__)(:)(\s+)(.*)/,
          [{ token: "", next: "subsequentLines" }, "", "", "", "string.link"]
        ],
        [/^(__\s+)(.+)/, ["", "string.link"]],
        //substitution-definitions
        [
          /^(\.\.)( \|)([^| ]+[^|]*[^| ]*)(\| )(@simpleRefName)(:: .*)/,
          [{ token: "", next: "subsequentLines" }, "", "string.link", "", "keyword", ""],
          "@rawBlocks"
        ],
        [/(\|)([^| ]+[^|]*[^| ]*)(\|_{0,2})/, ["", "string.link", ""]],
        //comments
        [/^(\.\.)([ ].*)$/, [{ token: "", next: "@comments" }, "comment"]]
      ],
      inlineMarkup: [
        { include: "@citationsReference" },
        { include: "@footnotesReference" },
        //hyperlink-references
        [/(@simpleRefName)(_{1,2})/, ["string.link", ""]],
        //embedded-uris-and-aliases
        [/(`)([^<`]+\s+)(<)(.*)(>)(`)(_)/, ["", "string.link", "", "string.link", "", "", ""]],
        //emphasis
        [/\*\*([^\\*]|\*(?!\*))+\*\*/, "strong"],
        [/\*[^*]+\*/, "emphasis"],
        //inline-literals
        [/(``)((?:[^`]|\`(?!`))+)(``)/, ["", "keyword", ""]],
        [/(__\s+)(.+)/, ["", "keyword"]],
        //interpreted-text
        [/(:)((?:@simpleRefNameWithoutBq)?)(:`)([^`]+)(`)/, ["", "keyword", "", "", ""]],
        [/(`)([^`]+)(`:)((?:@simpleRefNameWithoutBq)?)(:)/, ["", "", "", "keyword", ""]],
        [/(`)([^`]+)(`)/, ""],
        //inline-internal-targets
        [/(_`)(@phrase)(`)/, ["", "string.link", ""]]
      ],
      citations: [
        [
          /^(\.\.\s+\[)((?:@citationName))(\]\s+)(.*)/,
          [{ token: "", next: "@subsequentLines" }, "string.link", "", ""]
        ]
      ],
      citationsReference: [[/(\[)(@citationName)(\]_)/, ["", "string.link", ""]]],
      footnotes: [
        [
          /^(\.\.\s+\[)((?:[0-9]+))(\]\s+.*)/,
          [{ token: "", next: "@subsequentLines" }, "string.link", ""]
        ],
        [
          /^(\.\.\s+\[)((?:#@simpleRefName?))(\]\s+)(.*)/,
          [{ token: "", next: "@subsequentLines" }, "string.link", "", ""]
        ],
        [
          /^(\.\.\s+\[)((?:\*))(\]\s+)(.*)/,
          [{ token: "", next: "@subsequentLines" }, "string.link", "", ""]
        ]
      ],
      footnotesReference: [
        [/(\[)([0-9]+)(\])(_)/, ["", "string.link", "", ""]],
        [/(\[)(#@simpleRefName?)(\])(_)/, ["", "string.link", "", ""]],
        [/(\[)(\*)(\])(_)/, ["", "string.link", "", ""]]
      ],
      blankLineOfLiteralBlocks: [
        [/^$/, "", "@subsequentLinesOfLiteralBlocks"],
        [/^.*$/, "", "@pop"]
      ],
      subsequentLinesOfLiteralBlocks: [
        [/(@blockLiteralStart+)(.*)/, ["keyword", ""]],
        [/^(?!blockLiteralStart)/, "", "@popall"]
      ],
      subsequentLines: [
        [/^[\s]+.*/, ""],
        [/^(?!\s)/, "", "@pop"]
      ],
      hyperlinks: [
        [/^[\s]+.*/, "string.link"],
        [/^(?!\s)/, "", "@pop"]
      ],
      comments: [
        [/^[\s]+.*/, "comment"],
        [/^(?!\s)/, "", "@pop"]
      ],
      tables: [
        [/\+-[+-]+/, "keyword"],
        [/\+=[+=]+/, "keyword"]
      ]
    }
  };
  return __toCommonJS(restructuredtext_exports);
})();
return moduleExports;
});
