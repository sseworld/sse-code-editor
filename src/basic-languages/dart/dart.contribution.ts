/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerLanguage } from '../_.contribution';

declare var AMD: any;
declare var require: any;

registerLanguage({
	id: 'dart',
	extensions: ['.dart'],
	aliases: ['Dart', 'dart'],
	mimetypes: ['text/x-dart-source', 'text/x-dart'],
	loader: () => {
		if (AMD) {
			return new Promise((resolve, reject) => {
				require(['vs/basic-languages/dart/dart'], resolve, reject);
			});
		} else {
			return import('./dart');
		}
	}
});
