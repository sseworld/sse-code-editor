/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function getLoadedSSE(): typeof monaco {
	if (!monaco) {
		throw new Error("monaco is not loaded yet");
	}
	return monaco;
}

export function getSSE(): typeof monaco | undefined {
	return (window as any).monaco;
}

export interface ISSESetup {
	loaderUrl: string;
	loaderConfigPaths: Record<string, string>;
	codiconUrl: string;
	monacoTypesUrl: string | undefined;
}

let loading = false;
let resolve: (value: typeof monaco) => void;
let reject: (error: unknown) => void;
let loadSSEPromise = new Promise<typeof monaco>((res, rej) => {
	resolve = res;
	reject = rej;
});

export async function waitForLoadedSSE(): Promise<typeof monaco> {
	return loadSSEPromise;
}

export async function loadSSE(
	setup: ISSESetup = prodSSESetup
): Promise<typeof monaco> {
	if (!loading) {
		loading = true;
		_loadSSE(setup).then(resolve, reject);
	}
	return loadSSEPromise;
}

async function _loadSSE(setup: ISSESetup): Promise<typeof monaco> {
	const global = self as any;

	if (!(global as any).require) {
		await loadScript(setup.loaderUrl);
	}

	global.AMD = true;
	global.getCodiconPath = () => {
		return setup.codiconUrl;
	};

	/** @type {any} */
	const req = global.require as any;
	req.config({ paths: setup.loaderConfigPaths });

	return new Promise((res) => {
		// First load editor.main. If it inlines the plugins, we don't want to try to load them from the server.
		req(["vs/editor/editor.main"], () => {
			req(
				[
					"vs/basic-languages/monaco.contribution",
					"vs/language/css/monaco.contribution",
					"vs/language/html/monaco.contribution",
					"vs/language/json/monaco.contribution",
					"vs/language/typescript/monaco.contribution",
				],
				() => {
					res(monaco);
				}
			);
		});
	});
}

function loadScript(path: string): Promise<void> {
	return new Promise((res) => {
		const script = document.createElement("script");
		script.onload = () => res();
		script.async = true;
		script.type = "text/javascript";
		script.src = path; // CodeQL [SM01507] This is safe because the runner (that allows for dynamic paths) runs in an isolated iframe. The hosting website uses a static path configuration. // CodeQL [SM03712] This is safe because the runner (that allows for dynamic paths) runs in an isolated iframe. The hosting website uses a static path configuration.
		document.head.appendChild(script);
	});
}

export const prodSSESetup = getSSESetup(
	"node_modules/@sseworld/code-editor/min/vs"
);

export function getSSESetup(corePath: string): ISSESetup {
	const loaderConfigPaths = {
		vs: `${corePath}`,
	};

	return {
		loaderUrl: `${corePath}/loader.js`,
		loaderConfigPaths,
		codiconUrl: `${corePath}/base/browser/ui/codicons/codicon/codicon.ttf`,
		monacoTypesUrl: undefined,
	};
}
