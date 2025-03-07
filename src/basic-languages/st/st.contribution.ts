/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from '../_.contribution';

declare var AMD: any;
declare var require: any;

registerLanguage({
	id: 'st',
	extensions: ['.st', '.iecst', '.iecplc', '.lc3lib', '.TcPOU', '.TcDUT', '.TcGVL', '.TcIO'],
	aliases: ['StructuredText', 'scl', 'stl'],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(['vs/basic-languages/st/st'], resolve, reject);
			});
		} else {
			return import('./st');
		}
	}
});
