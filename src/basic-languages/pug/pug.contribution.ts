/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from '../_.contribution';

declare var AMD: any;
declare var require: any;

registerLanguage({
	id: 'pug',
	extensions: ['.jade', '.pug'],
	aliases: ['Pug', 'Jade', 'jade'],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(['vs/basic-languages/pug/pug'], resolve, reject);
			});
		} else {
			return import('./pug');
		}
	}
});
