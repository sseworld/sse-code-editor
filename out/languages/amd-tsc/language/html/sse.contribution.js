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
    exports.registerHTMLLanguageService = exports.razorDefaults = exports.razorLanguageService = exports.handlebarDefaults = exports.handlebarLanguageService = exports.htmlDefaults = exports.htmlLanguageService = void 0;
    // --- HTML configuration and defaults ---------
    var LanguageServiceDefaultsImpl = /** @class */ (function () {
        function LanguageServiceDefaultsImpl(languageId, options, modeConfiguration) {
            this._onDidChange = new sse_editor_core_1.Emitter();
            this._languageId = languageId;
            this.setOptions(options);
            this.setModeConfiguration(modeConfiguration);
        }
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "onDidChange", {
            get: function () {
                return this._onDidChange.event;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "languageId", {
            get: function () {
                return this._languageId;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LanguageServiceDefaultsImpl.prototype, "modeConfiguration", {
            get: function () {
                return this._modeConfiguration;
            },
            enumerable: false,
            configurable: true
        });
        LanguageServiceDefaultsImpl.prototype.setOptions = function (options) {
            this._options = options || Object.create(null);
            this._onDidChange.fire(this);
        };
        LanguageServiceDefaultsImpl.prototype.setModeConfiguration = function (modeConfiguration) {
            this._modeConfiguration = modeConfiguration || Object.create(null);
            this._onDidChange.fire(this);
        };
        return LanguageServiceDefaultsImpl;
    }());
    var formatDefaults = {
        tabSize: 4,
        insertSpaces: false,
        wrapLineLength: 120,
        unformatted: 'default": "a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, object, q, samp, select, small, span, strong, sub, sup, textarea, tt, var',
        contentUnformatted: 'pre',
        indentInnerHtml: false,
        preserveNewLines: true,
        maxPreserveNewLines: undefined,
        indentHandlebars: false,
        endWithNewline: false,
        extraLiners: 'head, body, /html',
        wrapAttributes: 'auto'
    };
    var optionsDefault = {
        format: formatDefaults,
        suggest: {},
        data: { useDefaultDataProvider: true }
    };
    function getConfigurationDefault(languageId) {
        return {
            completionItems: true,
            hovers: true,
            documentSymbols: true,
            links: true,
            documentHighlights: true,
            rename: true,
            colors: true,
            foldingRanges: true,
            selectionRanges: true,
            diagnostics: languageId === htmlLanguageId, // turned off for Razor and Handlebar
            documentFormattingEdits: languageId === htmlLanguageId, // turned off for Razor and Handlebar
            documentRangeFormattingEdits: languageId === htmlLanguageId // turned off for Razor and Handlebar
        };
    }
    var htmlLanguageId = 'html';
    var handlebarsLanguageId = 'handlebars';
    var razorLanguageId = 'razor';
    exports.htmlLanguageService = registerHTMLLanguageService(htmlLanguageId, optionsDefault, getConfigurationDefault(htmlLanguageId));
    exports.htmlDefaults = exports.htmlLanguageService.defaults;
    exports.handlebarLanguageService = registerHTMLLanguageService(handlebarsLanguageId, optionsDefault, getConfigurationDefault(handlebarsLanguageId));
    exports.handlebarDefaults = exports.handlebarLanguageService.defaults;
    exports.razorLanguageService = registerHTMLLanguageService(razorLanguageId, optionsDefault, getConfigurationDefault(razorLanguageId));
    exports.razorDefaults = exports.razorLanguageService.defaults;
    // export to the global based API
    sse_editor_core_1.languages.html = {
        htmlDefaults: exports.htmlDefaults,
        razorDefaults: exports.razorDefaults,
        handlebarDefaults: exports.handlebarDefaults,
        htmlLanguageService: exports.htmlLanguageService,
        handlebarLanguageService: exports.handlebarLanguageService,
        razorLanguageService: exports.razorLanguageService,
        registerHTMLLanguageService: registerHTMLLanguageService
    };
    function getMode() {
        if (AMD) {
            return new Promise(function (resolve, reject) {
                require(['vs/language/html/htmlMode'], resolve, reject);
            });
        }
        else {
            return new Promise(function (resolve_1, reject_1) { require(['./htmlMode'], resolve_1, reject_1); });
        }
    }
    /**
     * Registers a new HTML language service for the languageId.
     * Note: 'html', 'handlebar' and 'razor' are registered by default.
     *
     * Use this method to register additional language ids with a HTML service.
     * The language server has to be registered before an editor model is opened.
     */
    function registerHTMLLanguageService(languageId, options, modeConfiguration) {
        var _this = this;
        if (options === void 0) { options = optionsDefault; }
        if (modeConfiguration === void 0) { modeConfiguration = getConfigurationDefault(languageId); }
        var defaults = new LanguageServiceDefaultsImpl(languageId, options, modeConfiguration);
        var mode;
        // delay the initalization of the mode until the language is accessed the first time
        var onLanguageListener = sse_editor_core_1.languages.onLanguage(languageId, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getMode()];
                    case 1:
                        mode = (_a.sent()).setupMode(defaults);
                        return [2 /*return*/];
                }
            });
        }); });
        return {
            defaults: defaults,
            dispose: function () {
                onLanguageListener.dispose();
                mode === null || mode === void 0 ? void 0 : mode.dispose();
                mode = undefined;
            }
        };
    }
    exports.registerHTMLLanguageService = registerHTMLLanguageService;
});
//# sourceMappingURL=sse.contribution.js.map