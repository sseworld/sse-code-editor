import { LanguageServiceDefaults } from './sse.contribution';
import type { HTMLWorker } from './htmlWorker';
import { Uri } from '../../fillers/sse-editor-core';
export declare class WorkerManager {
    private _defaults;
    private _idleCheckInterval;
    private _lastUsedTime;
    private _configChangeListener;
    private _worker;
    private _client;
    constructor(defaults: LanguageServiceDefaults);
    private _stopWorker;
    dispose(): void;
    private _checkIfIdle;
    private _getClient;
    getLanguageServiceWorker(...resources: Uri[]): Promise<HTMLWorker>;
}
