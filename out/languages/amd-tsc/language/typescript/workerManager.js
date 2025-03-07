/*---------------------------------------------------------------------------------------------
 *  Copyright (c) SSE World. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../fillers/sse-editor-core"], function (require, exports, sse_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerManager = void 0;
    var WorkerManager = /** @class */ (function () {
        function WorkerManager(_modeId, _defaults) {
            var _this = this;
            this._modeId = _modeId;
            this._defaults = _defaults;
            this._worker = null;
            this._client = null;
            this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });
            this._updateExtraLibsToken = 0;
            this._extraLibsChangeListener = this._defaults.onDidExtraLibsChange(function () {
                return _this._updateExtraLibs();
            });
        }
        WorkerManager.prototype.dispose = function () {
            this._configChangeListener.dispose();
            this._extraLibsChangeListener.dispose();
            this._stopWorker();
        };
        WorkerManager.prototype._stopWorker = function () {
            if (this._worker) {
                this._worker.dispose();
                this._worker = null;
            }
            this._client = null;
        };
        WorkerManager.prototype._updateExtraLibs = function () {
            return __awaiter(this, void 0, void 0, function () {
                var myToken, proxy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._worker) {
                                return [2 /*return*/];
                            }
                            myToken = ++this._updateExtraLibsToken;
                            return [4 /*yield*/, this._worker.getProxy()];
                        case 1:
                            proxy = _a.sent();
                            if (this._updateExtraLibsToken !== myToken) {
                                // avoid multiple calls
                                return [2 /*return*/];
                            }
                            proxy.updateExtraLibs(this._defaults.getExtraLibs());
                            return [2 /*return*/];
                    }
                });
            });
        };
        WorkerManager.prototype._getClient = function () {
            var _this = this;
            if (!this._client) {
                this._client = (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this._worker = sse_editor_core_1.editor.createWebWorker({
                                    // module that exports the create() method and returns a `TypeScriptWorker` instance
                                    moduleId: 'vs/language/typescript/tsWorker',
                                    label: this._modeId,
                                    keepIdleModels: true,
                                    // passed in to the create() method
                                    createData: {
                                        compilerOptions: this._defaults.getCompilerOptions(),
                                        extraLibs: this._defaults.getExtraLibs(),
                                        customWorkerPath: this._defaults.workerOptions.customWorkerPath,
                                        inlayHintsOptions: this._defaults.inlayHintsOptions
                                    }
                                });
                                if (!this._defaults.getEagerModelSync()) return [3 /*break*/, 2];
                                return [4 /*yield*/, this._worker.withSyncedResources(sse_editor_core_1.editor
                                        .getModels()
                                        .filter(function (model) { return model.getLanguageId() === _this._modeId; })
                                        .map(function (model) { return model.uri; }))];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2: return [4 /*yield*/, this._worker.getProxy()];
                            case 3: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); })();
            }
            return this._client;
        };
        WorkerManager.prototype.getLanguageServiceWorker = function () {
            var resources = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                resources[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var client;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getClient()];
                        case 1:
                            client = _a.sent();
                            if (!this._worker) return [3 /*break*/, 3];
                            return [4 /*yield*/, this._worker.withSyncedResources(resources)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, client];
                    }
                });
            });
        };
        return WorkerManager;
    }());
    exports.WorkerManager = WorkerManager;
});
//# sourceMappingURL=workerManager.js.map