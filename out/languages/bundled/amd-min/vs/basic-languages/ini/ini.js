/*!-----------------------------------------------------------------------------
 * Copyright (c) SSE World. All rights reserved.
 * Version: 1.0.0(0a8ae934ef197f533a1dfc2709984aaf6061d2a1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/ini/ini", ["require","require"],(require)=>{
"use strict";var moduleExports=(()=>{var t=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var r=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var c=(n,e)=>{for(var o in e)t(n,o,{get:e[o],enumerable:!0})},l=(n,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of r(e))!g.call(n,s)&&s!==o&&t(n,s,{get:()=>e[s],enumerable:!(i=a(e,s))||i.enumerable});return n};var p=n=>l(t({},"__esModule",{value:!0}),n);var m={};c(m,{conf:()=>u,language:()=>f});var u={comments:{lineComment:"#"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}]},f={defaultToken:"",tokenPostfix:".ini",escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[[/^\[[^\]]*\]/,"metatag"],[/(^\w+)(\s*)(\=)/,["key","","delimiter"]],{include:"@whitespace"},[/\d+/,"number"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/"/,"string",'@string."'],[/'/,"string","@string.'"]],whitespace:[[/[ \t\r\n]+/,""],[/^\s*[#;].*$/,"comment"]],string:[[/[^\\"']+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/["']/,{cases:{"$#==$S2":{token:"string",next:"@pop"},"@default":"string"}}]]}};return p(m);})();
return moduleExports;
});
