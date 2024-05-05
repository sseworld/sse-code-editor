import type { TypeScriptWorker } from './tsWorker';
import { LanguageServiceDefaults } from './sse.contribution';
import { Uri } from '../../fillers/sse-editor-core';
export declare function setupTypeScript(defaults: LanguageServiceDefaults): void;
export declare function setupJavaScript(defaults: LanguageServiceDefaults): void;
export declare function getJavaScriptWorker(): Promise<(...uris: Uri[]) => Promise<TypeScriptWorker>>;
export declare function getTypeScriptWorker(): Promise<(...uris: Uri[]) => Promise<TypeScriptWorker>>;
export { WorkerManager } from './workerManager';
export * from './languageFeatures';
