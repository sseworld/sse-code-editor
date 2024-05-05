/*!-----------------------------------------------------------------------------
 * Copyright (c) SSE World. All rights reserved.
 * Version: 1.0.0(0a8ae934ef197f533a1dfc2709984aaf6061d2a1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/language/css/sse.contribution", ["require","vs/editor/editor.api"],(require)=>{
"use strict";
var moduleExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/fillers/sse-editor-core-amd.ts
  var require_sse_editor_core_amd = __commonJS({
    "src/fillers/sse-editor-core-amd.ts"(exports, module) {
      var api = __toESM(__require("vs/editor/editor.api"));
      module.exports = api;
    }
  });

  // src/language/css/sse.contribution.ts
  var sse_contribution_exports = {};
  __export(sse_contribution_exports, {
    cssDefaults: () => cssDefaults,
    lessDefaults: () => lessDefaults,
    scssDefaults: () => scssDefaults
  });

  // src/fillers/sse-editor-core.ts
  var sse_editor_core_exports = {};
  __reExport(sse_editor_core_exports, __toESM(require_sse_editor_core_amd()));

  // src/language/css/sse.contribution.ts
  var LanguageServiceDefaultsImpl = class {
    constructor(languageId, options, modeConfiguration) {
      this._onDidChange = new sse_editor_core_exports.Emitter();
      this._languageId = languageId;
      this.setOptions(options);
      this.setModeConfiguration(modeConfiguration);
    }
    get onDidChange() {
      return this._onDidChange.event;
    }
    get languageId() {
      return this._languageId;
    }
    get modeConfiguration() {
      return this._modeConfiguration;
    }
    get diagnosticsOptions() {
      return this.options;
    }
    get options() {
      return this._options;
    }
    setOptions(options) {
      this._options = options || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(this);
    }
    setDiagnosticsOptions(options) {
      this.setOptions(options);
    }
    setModeConfiguration(modeConfiguration) {
      this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
      this._onDidChange.fire(this);
    }
  };
  var optionsDefault = {
    validate: true,
    lint: {
      compatibleVendorPrefixes: "ignore",
      vendorPrefix: "warning",
      duplicateProperties: "warning",
      emptyRules: "warning",
      importStatement: "ignore",
      boxModel: "ignore",
      universalSelector: "ignore",
      zeroUnits: "ignore",
      fontFaceProperties: "warning",
      hexColorLength: "error",
      argumentsInColorFunction: "error",
      unknownProperties: "warning",
      ieHack: "ignore",
      unknownVendorSpecificProperties: "ignore",
      propertyIgnoredDueToDisplay: "warning",
      important: "ignore",
      float: "ignore",
      idSelector: "ignore"
    },
    data: { useDefaultDataProvider: true },
    format: {
      newlineBetweenSelectors: true,
      newlineBetweenRules: true,
      spaceAroundSelectorSeparator: false,
      braceStyle: "collapse",
      maxPreserveNewLines: void 0,
      preserveNewLines: true
    }
  };
  var modeConfigurationDefault = {
    completionItems: true,
    hovers: true,
    documentSymbols: true,
    definitions: true,
    references: true,
    documentHighlights: true,
    rename: true,
    colors: true,
    foldingRanges: true,
    diagnostics: true,
    selectionRanges: true,
    documentFormattingEdits: true,
    documentRangeFormattingEdits: true
  };
  var cssDefaults = new LanguageServiceDefaultsImpl(
    "css",
    optionsDefault,
    modeConfigurationDefault
  );
  var scssDefaults = new LanguageServiceDefaultsImpl(
    "scss",
    optionsDefault,
    modeConfigurationDefault
  );
  var lessDefaults = new LanguageServiceDefaultsImpl(
    "less",
    optionsDefault,
    modeConfigurationDefault
  );
  sse_editor_core_exports.languages.css = { cssDefaults, lessDefaults, scssDefaults };
  function getMode() {
    if (true) {
      return new Promise((resolve, reject) => {
        __require(["vs/language/css/cssMode"], resolve, reject);
      });
    } else {
      return null;
    }
  }
  sse_editor_core_exports.languages.onLanguage("less", () => {
    getMode().then((mode) => mode.setupMode(lessDefaults));
  });
  sse_editor_core_exports.languages.onLanguage("scss", () => {
    getMode().then((mode) => mode.setupMode(scssDefaults));
  });
  sse_editor_core_exports.languages.onLanguage("css", () => {
    getMode().then((mode) => mode.setupMode(cssDefaults));
  });
  return __toCommonJS(sse_contribution_exports);
})();
return moduleExports;
});
