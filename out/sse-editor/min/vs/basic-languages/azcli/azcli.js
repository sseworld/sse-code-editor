/*!-----------------------------------------------------------------------------
 * Copyright (c) SSE World. All rights reserved.
 * Version: 1.0.0(0a8ae934ef197f533a1dfc2709984aaf6061d2a1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/azcli/azcli", ["require","require"],(require)=>{
"use strict";var moduleExports=(()=>{var s=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var r=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var c=(t,e)=>{for(var o in e)s(t,o,{get:e[o],enumerable:!0})},k=(t,e,o,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of r(e))!l.call(t,n)&&n!==o&&s(t,n,{get:()=>e[n],enumerable:!(i=a(e,n))||i.enumerable});return t};var p=t=>k(s({},"__esModule",{value:!0}),t);var d={};c(d,{conf:()=>f,language:()=>g});var f={comments:{lineComment:"#"}},g={defaultToken:"keyword",ignoreCase:!0,tokenPostfix:".azcli",str:/[^#\s]/,tokenizer:{root:[{include:"@comment"},[/\s-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":{token:"key.identifier",next:"@type"}}}],[/^-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":{token:"key.identifier",next:"@type"}}}]],type:[{include:"@comment"},[/-+@str*\s*/,{cases:{"@eos":{token:"key.identifier",next:"@popall"},"@default":"key.identifier"}}],[/@str+\s*/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}]],comment:[[/#.*$/,{cases:{"@eos":{token:"comment",next:"@popall"}}}]]}};return p(d);})();
return moduleExports;
});
