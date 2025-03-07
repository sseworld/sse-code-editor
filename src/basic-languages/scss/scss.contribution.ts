/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from '../_.contribution';

declare var AMD: any;
declare var require: any;

registerLanguage({
	id: 'scss',
	extensions: ['.scss'],
	aliases: ['Sass', 'sass', 'scss'],
	mimetypes: ['text/x-scss', 'text/scss'],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(['vs/basic-languages/scss/scss'], resolve, reject);
			});
		} else {
			return import('./scss');
		}
	}
});
