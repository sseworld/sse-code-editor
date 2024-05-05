import { languages } from '../fillers/sse-editor-core';
interface ILang extends languages.ILanguageExtensionPoint {
    loader: () => Promise<ILangImpl>;
}
interface ILangImpl {
    conf: languages.LanguageConfiguration;
    language: languages.IMonarchLanguage;
}
export declare function loadLanguage(languageId: string): Promise<void>;
export declare function registerLanguage(def: ILang): void;
export {};
