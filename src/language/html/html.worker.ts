/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker';
import { HTMLWorker } from './htmlWorker';

self.onmessage = () => {
	// ignore the first message
	worker.initialize((ctx, createData) => {
		return new HTMLWorker(ctx, createData);
	});
};
