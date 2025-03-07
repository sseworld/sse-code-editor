/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require", "exports", "../../fillers/sse-editor-core"], function (require, exports, sse_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerManager = void 0;
    var STOP_WHEN_IDLE_FOR = 2 * 60 * 1000; // 2min
    var WorkerManager = /** @class */ (function () {
        function WorkerManager(defaults) {
            var _this = this;
            this._defaults = defaults;
            this._worker = null;
            this._client = null;
            this._idleCheckInterval = window.setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);
            this._lastUsedTime = 0;
            this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });
        }
        WorkerManager.prototype._stopWorker = function () {
            if (this._worker) {
                this._worker.dispose();
                this._worker = null;
            }
            this._client = null;
        };
        WorkerManager.prototype.dispose = function () {
            clearInterval(this._idleCheckInterval);
            this._configChangeListener.dispose();
            this._stopWorker();
        };
        WorkerManager.prototype._checkIfIdle = function () {
            if (!this._worker) {
                return;
            }
            var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
            if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
                this._stopWorker();
            }
        };
        WorkerManager.prototype._getClient = function () {
            this._lastUsedTime = Date.now();
            if (!this._client) {
                this._worker = sse_editor_core_1.editor.createWebWorker({
                    // module that exports the create() method and returns a `CSSWorker` instance
                    moduleId: 'vs/language/css/cssWorker',
                    label: this._defaults.languageId,
                    // passed in to the create() method
                    createData: {
                        options: this._defaults.options,
                        languageId: this._defaults.languageId
                    }
                });
                this._client = this._worker.getProxy();
            }
            return this._client;
        };
        WorkerManager.prototype.getLanguageServiceWorker = function () {
            var _this = this;
            var resources = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                resources[_i] = arguments[_i];
            }
            var _client;
            return this._getClient()
                .then(function (client) {
                _client = client;
            })
                .then(function (_) {
                if (_this._worker) {
                    return _this._worker.withSyncedResources(resources);
                }
            })
                .then(function (_) { return _client; });
        };
        return WorkerManager;
    }());
    exports.WorkerManager = WorkerManager;
});
//# sourceMappingURL=workerManager.js.map