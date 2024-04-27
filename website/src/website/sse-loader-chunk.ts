/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// This is an optional load optimization - it inlines the AMD loader and the core editor.
// We have to configure this before loading editor.main, as it tries to load css
(global as any).require = {
	paths: { vs: "node_modules/@sseworld/code-editor/min/vs" },
};
require("script-loader!../../node_modules/@sseworld/code-editor/min/vs/loader");
require("script-loader!../../node_modules/@sseworld/code-editor/min/vs/editor/editor.main.nls.js");
require("script-loader!../../node_modules/@sseworld/code-editor/min/vs/editor/editor.main.js");
import { loadSSE } from "../sse-loader";

loadSSE();
