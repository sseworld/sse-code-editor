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
define(["require", "exports", "../fillers/sse-editor-core"], function (require, exports, sse_editor_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerLanguage = exports.loadLanguage = void 0;
    var languageDefinitions = {};
    var lazyLanguageLoaders = {};
    var LazyLanguageLoader = /** @class */ (function () {
        function LazyLanguageLoader(languageId) {
            var _this = this;
            this._languageId = languageId;
            this._loadingTriggered = false;
            this._lazyLoadPromise = new Promise(function (resolve, reject) {
                _this._lazyLoadPromiseResolve = resolve;
                _this._lazyLoadPromiseReject = reject;
            });
        }
        LazyLanguageLoader.getOrCreate = function (languageId) {
            if (!lazyLanguageLoaders[languageId]) {
                lazyLanguageLoaders[languageId] = new LazyLanguageLoader(languageId);
            }
            return lazyLanguageLoaders[languageId];
        };
        LazyLanguageLoader.prototype.load = function () {
            var _this = this;
            if (!this._loadingTriggered) {
                this._loadingTriggered = true;
                languageDefinitions[this._languageId].loader().then(function (mod) { return _this._lazyLoadPromiseResolve(mod); }, function (err) { return _this._lazyLoadPromiseReject(err); });
            }
            return this._lazyLoadPromise;
        };
        return LazyLanguageLoader;
    }());
    function loadLanguage(languageId) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LazyLanguageLoader.getOrCreate(languageId).load()];
                    case 1:
                        _a.sent();
                        model = sse_editor_core_1.editor.createModel('', languageId);
                        model.dispose();
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.loadLanguage = loadLanguage;
    function registerLanguage(def) {
        var _this = this;
        var languageId = def.id;
        languageDefinitions[languageId] = def;
        sse_editor_core_1.languages.register(def);
        var lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
        sse_editor_core_1.languages.registerTokensProviderFactory(languageId, {
            create: function () { return __awaiter(_this, void 0, void 0, function () {
                var mod;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, lazyLanguageLoader.load()];
                        case 1:
                            mod = _a.sent();
                            return [2 /*return*/, mod.language];
                    }
                });
            }); }
        });
        sse_editor_core_1.languages.onLanguageEncountered(languageId, function () { return __awaiter(_this, void 0, void 0, function () {
            var mod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lazyLanguageLoader.load()];
                    case 1:
                        mod = _a.sent();
                        sse_editor_core_1.languages.setLanguageConfiguration(languageId, mod.conf);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    exports.registerLanguage = registerLanguage;
});
//# sourceMappingURL=_.contribution.js.map