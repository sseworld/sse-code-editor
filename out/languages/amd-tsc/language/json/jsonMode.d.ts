import type { JSONWorker } from './jsonWorker';
import { LanguageServiceDefaults } from './sse.contribution';
import { Uri, IDisposable } from '../../fillers/sse-editor-core';
export declare function getWorker(): Promise<(...uris: Uri[]) => Promise<JSONWorker>>;
export declare function setupMode(defaults: LanguageServiceDefaults): IDisposable;
export { WorkerManager } from './workerManager';
export * from '../common/lspLanguageFeatures';
