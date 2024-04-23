import { mkdir, rm } from 'fs/promises';
import { join, resolve } from 'path';
import { PackageJson, group, gitShallowClone, run, writeJsonFile, getNightlyVersion } from '../lib';
import { getNightlyEnv } from './env';

const selfPath = __dirname;
const rootPath = join(selfPath, '..', '..');
const dependenciesPath = join(rootPath, 'dependencies');
const vscodePath = resolve(dependenciesPath, 'vscode');
const sseEditorPackageJsonPath = resolve(rootPath, 'package.json');

async function prepareSSEEditorCoreReleaseStableOrNightly() {
	const sseEditorPackageJson = require(sseEditorPackageJsonPath) as {
		version: string;
		vscodeRef: string;
	};
	let version: string;
	let ref: string;

	const arg = process.argv[2];
	if (arg === 'stable') {
		version = sseEditorPackageJson.version;
		ref = sseEditorPackageJson.vscodeRef;
	} else if (arg === 'nightly') {
		version = getNightlyVersion(sseEditorPackageJson.version, getNightlyEnv().PRERELEASE_VERSION);
		ref = getNightlyEnv().VSCODE_REF;
	} else {
		throw new Error('Invalid argument');
	}

	await prepareSSEEditorCoreRelease(version, ref);

	// npm package is now in dependencies/vscode/out-sse-editor-core, ready to be published
}

async function prepareSSEEditorCoreRelease(version: string, vscodeRef: string) {
	await mkdir(vscodePath, { recursive: true });

	await rm(dependenciesPath, { force: true, recursive: true });

	let vscodeCommitId: string;

	await group('Checkout vscode', async () => {
		const result = await gitShallowClone(
			vscodePath,
			'https://github.com/microsoft/vscode.git',
			vscodeRef
		);
		vscodeCommitId = result.commitId;
	});

	await group('Checkout vscode-loc', async () => {
		await gitShallowClone(
			// Must be a sibling to the vscode repository
			'dependencies/vscode-loc',
			'https://github.com/microsoft/vscode-loc.git',
			'main'
		);
	});

	await group('Set Version', async () => {
		const sseEditorCorePackageJsonSourcePath = resolve(vscodePath, './build/sse/package.json');
		const packageJson = require(sseEditorCorePackageJsonSourcePath) as PackageJson;
		packageJson.version = version;
		// This ensures we can always figure out which commit sse-editor-core was built from
		packageJson.vscodeCommitId = vscodeCommitId;
		await writeJsonFile(sseEditorCorePackageJsonSourcePath, packageJson);
	});

	await group('Building & Testing', async () => {
		await run(resolve(selfPath, './sse-editor-core.sh'), {
			cwd: vscodePath
		});
	});
}

prepareSSEEditorCoreReleaseStableOrNightly();
