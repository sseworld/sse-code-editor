import { LanguageServiceDefaults } from './sse.contribution';
import { IDisposable } from '../../fillers/sse-editor-core';
export declare function setupMode1(defaults: LanguageServiceDefaults): void;
export declare function setupMode(defaults: LanguageServiceDefaults): IDisposable;
export { WorkerManager } from './workerManager';
export * from '../common/lspLanguageFeatures';
