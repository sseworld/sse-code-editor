/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { EventType, addDisposableListener, h } from '../../../../../base/browser/dom.js';
import { Disposable } from '../../../../../base/common/lifecycle.js';
import { autorun, autorunWithStore, derived, observableFromEvent, observableValue } from '../../../../../base/common/observable.js';
import { appendRemoveOnDispose, applyStyle } from '../utils.js';
import { EditorGutter } from '../utils/editorGutter.js';
import { ActionRunnerWithContext } from '../../multiDiffEditor/utils.js';
import { LineRange, LineRangeSet } from '../../../../common/core/lineRange.js';
import { OffsetRange } from '../../../../common/core/offsetRange.js';
import { Range } from '../../../../common/core/range.js';
import { SingleTextEdit, TextEdit } from '../../../../common/core/textEdit.js';
import { DetailedLineRangeMapping } from '../../../../common/diff/rangeMapping.js';
import { TextModelText } from '../../../../common/model/textModelText.js';
import { MenuWorkbenchToolBar } from '../../../../../platform/actions/browser/toolbar.js';
import { IMenuService, MenuId } from '../../../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../../../platform/contextkey/common/contextkey.js';
import { WorkbenchHoverDelegate } from '../../../../../platform/hover/browser/hover.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
const emptyArr = [];
const width = 35;
let DiffEditorGutter = class DiffEditorGutter extends Disposable {
    constructor(diffEditorRoot, _diffModel, _editors, _instantiationService, _contextKeyService, _menuService) {
        super();
        this._diffModel = _diffModel;
        this._editors = _editors;
        this._instantiationService = _instantiationService;
        this._contextKeyService = _contextKeyService;
        this._menuService = _menuService;
        this._menu = this._register(this._menuService.createMenu(MenuId.DiffEditorHunkToolbar, this._contextKeyService));
        this._actions = observableFromEvent(this._menu.onDidChange, () => this._menu.getActions());
        this._hasActions = this._actions.map(a => a.length > 0);
        this.width = derived(this, reader => this._hasActions.read(reader) ? width : 0);
        this.elements = h('div.gutter@gutter', { style: { position: 'absolute', height: '100%', width: width + 'px', zIndex: '0' } }, []);
        this._currentDiff = derived(this, (reader) => {
            var _a;
            const model = this._diffModel.read(reader);
            if (!model) {
                return undefined;
            }
            const mappings = (_a = model.diff.read(reader)) === null || _a === void 0 ? void 0 : _a.mappings;
            const cursorPosition = this._editors.modifiedCursor.read(reader);
            if (!cursorPosition) {
                return undefined;
            }
            return mappings === null || mappings === void 0 ? void 0 : mappings.find(m => m.lineRangeMapping.modified.contains(cursorPosition.lineNumber));
        });
        this._selectedDiffs = derived(this, (reader) => {
            /** @description selectedDiffs */
            const model = this._diffModel.read(reader);
            const diff = model === null || model === void 0 ? void 0 : model.diff.read(reader);
            // Return `emptyArr` because it is a constant. [] is always a new array and would trigger a change.
            if (!diff) {
                return emptyArr;
            }
            const selections = this._editors.modifiedSelections.read(reader);
            if (selections.every(s => s.isEmpty())) {
                return emptyArr;
            }
            const selectedLineNumbers = new LineRangeSet(selections.map(s => LineRange.fromRangeInclusive(s)));
            const selectedMappings = diff.mappings.filter(m => m.lineRangeMapping.innerChanges && selectedLineNumbers.intersects(m.lineRangeMapping.modified));
            const result = selectedMappings.map(mapping => ({
                mapping,
                rangeMappings: mapping.lineRangeMapping.innerChanges.filter(c => selections.some(s => Range.areIntersecting(c.modifiedRange, s)))
            }));
            if (result.length === 0 || result.every(r => r.rangeMappings.length === 0)) {
                return emptyArr;
            }
            return result;
        });
        this._register(appendRemoveOnDispose(diffEditorRoot, this.elements.root));
        this._register(addDisposableListener(this.elements.root, 'click', () => {
            this._editors.modified.focus();
        }));
        this._register(applyStyle(this.elements.root, { display: this._hasActions.map(a => a ? 'block' : 'none') }));
        this._register(new EditorGutter(this._editors.modified, this.elements.root, {
            getIntersectingGutterItems: (range, reader) => {
                const model = this._diffModel.read(reader);
                if (!model) {
                    return [];
                }
                const diffs = model.diff.read(reader);
                if (!diffs) {
                    return [];
                }
                const selection = this._selectedDiffs.read(reader);
                if (selection.length > 0) {
                    const m = DetailedLineRangeMapping.fromRangeMappings(selection.flatMap(s => s.rangeMappings));
                    return [new DiffGutterItem(m, true, MenuId.DiffEditorSelectionToolbar, undefined)];
                }
                const currentDiff = this._currentDiff.read(reader);
                return diffs.mappings.map(m => new DiffGutterItem(m.lineRangeMapping, m.lineRangeMapping === (currentDiff === null || currentDiff === void 0 ? void 0 : currentDiff.lineRangeMapping), MenuId.DiffEditorHunkToolbar, undefined));
            },
            createView: (item, target) => {
                return this._instantiationService.createInstance(DiffToolBar, item, target, this);
            },
        }));
        this._register(addDisposableListener(this.elements.gutter, EventType.MOUSE_WHEEL, (e) => {
            if (!this._editors.modified.getOption(103 /* EditorOption.scrollbar */).handleMouseWheel) {
                this._editors.modified.delegateScrollFromMouseWheelEvent(e);
            }
        }, { passive: false }));
    }
    computeStagedValue(mapping) {
        var _a;
        const c = (_a = mapping.innerChanges) !== null && _a !== void 0 ? _a : [];
        const edit = new TextEdit(c.map(c => new SingleTextEdit(c.originalRange, this._editors.modifiedModel.get().getValueInRange(c.modifiedRange))));
        const value = edit.apply(new TextModelText(this._editors.original.getModel()));
        return value;
    }
    layout(left) {
        this.elements.gutter.style.left = left + 'px';
    }
};
DiffEditorGutter = __decorate([
    __param(3, IInstantiationService),
    __param(4, IContextKeyService),
    __param(5, IMenuService)
], DiffEditorGutter);
export { DiffEditorGutter };
class DiffGutterItem {
    constructor(mapping, showAlways, menuId, rangeOverride) {
        this.mapping = mapping;
        this.showAlways = showAlways;
        this.menuId = menuId;
        this.rangeOverride = rangeOverride;
    }
    get id() { return this.mapping.modified.toString(); }
    get range() { var _a; return (_a = this.rangeOverride) !== null && _a !== void 0 ? _a : this.mapping.modified; }
}
let DiffToolBar = class DiffToolBar extends Disposable {
    constructor(_item, target, gutter, instantiationService) {
        super();
        this._item = _item;
        this._elements = h('div.gutterItem', { style: { height: '20px', width: '34px' } }, [
            h('div.background@background', {}, []),
            h('div.buttons@buttons', {}, []),
        ]);
        this._showAlways = this._item.map(this, item => item.showAlways);
        this._menuId = this._item.map(this, item => item.menuId);
        this._isSmall = observableValue(this, false);
        this._lastItemRange = undefined;
        this._lastViewRange = undefined;
        //const r = new ObservableElementSizeObserver
        const hoverDelegate = this._register(instantiationService.createInstance(WorkbenchHoverDelegate, 'element', true, { position: { hoverPosition: 1 /* HoverPosition.RIGHT */ } }));
        this._register(appendRemoveOnDispose(target, this._elements.root));
        this._register(autorun(reader => {
            /** @description update showAlways */
            const showAlways = this._showAlways.read(reader);
            this._elements.root.classList.toggle('noTransition', true);
            this._elements.root.classList.toggle('showAlways', showAlways);
            setTimeout(() => {
                this._elements.root.classList.toggle('noTransition', false);
            }, 0);
        }));
        this._register(autorunWithStore((reader, store) => {
            this._elements.buttons.replaceChildren();
            const i = store.add(instantiationService.createInstance(MenuWorkbenchToolBar, this._elements.buttons, this._menuId.read(reader), {
                orientation: 1 /* ActionsOrientation.VERTICAL */,
                hoverDelegate,
                toolbarOptions: {
                    primaryGroup: g => g.startsWith('primary'),
                },
                overflowBehavior: { maxItems: this._isSmall.read(reader) ? 1 : 3 },
                hiddenItemStrategy: 0 /* HiddenItemStrategy.Ignore */,
                actionRunner: new ActionRunnerWithContext(() => {
                    const mapping = this._item.get().mapping;
                    return {
                        mapping,
                        originalWithModifiedChanges: gutter.computeStagedValue(mapping),
                    };
                }),
                menuOptions: {
                    shouldForwardArgs: true,
                },
            }));
            store.add(i.onDidChangeMenuItems(() => {
                if (this._lastItemRange) {
                    this.layout(this._lastItemRange, this._lastViewRange);
                }
            }));
        }));
    }
    layout(itemRange, viewRange) {
        this._lastItemRange = itemRange;
        this._lastViewRange = viewRange;
        let itemHeight = this._elements.buttons.clientHeight;
        this._isSmall.set(this._item.get().mapping.original.startLineNumber === 1 && itemRange.length < 30, undefined);
        // Item might have changed
        itemHeight = this._elements.buttons.clientHeight;
        this._elements.root.style.top = itemRange.start + 'px';
        this._elements.root.style.height = itemRange.length + 'px';
        const middleHeight = itemRange.length / 2 - itemHeight / 2;
        const margin = itemHeight;
        let effectiveCheckboxTop = itemRange.start + middleHeight;
        const preferredViewPortRange = OffsetRange.tryCreate(margin, viewRange.endExclusive - margin - itemHeight);
        const preferredParentRange = OffsetRange.tryCreate(itemRange.start + margin, itemRange.endExclusive - itemHeight - margin);
        if (preferredParentRange && preferredViewPortRange && preferredParentRange.start < preferredParentRange.endExclusive) {
            effectiveCheckboxTop = preferredViewPortRange.clip(effectiveCheckboxTop);
            effectiveCheckboxTop = preferredParentRange.clip(effectiveCheckboxTop);
        }
        this._elements.buttons.style.top = `${effectiveCheckboxTop - itemRange.start}px`;
    }
};
DiffToolBar = __decorate([
    __param(3, IInstantiationService)
], DiffToolBar);
