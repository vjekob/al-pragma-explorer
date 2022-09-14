import {
    CancellationToken,
    Disposable,
    Event,
    ProviderResult,
    TreeDataProvider,
    TreeItem,
    TreeItemCollapsibleState,
    workspace,
} from 'vscode';
import { Pragma } from '../model/Pragma';
import { PragmaFile } from '../model/PragmaFile';
import { PragmaTreeItem } from '../model/PragmaTreeItem';
import { PragmaWorkspace } from '../model/PragmaWorkspace';

export class PragmaViewProvider implements Disposable, TreeDataProvider<PragmaTreeItem> {
    onDidChangeTreeData?: Event<void | PragmaTreeItem | PragmaTreeItem[] | null | undefined> | undefined;

    getTreeItem(element: PragmaTreeItem): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: PragmaTreeItem | undefined): ProviderResult<PragmaTreeItem[]> {
        // Sub-children
        if (element?.getChildren) {
            return element.getChildren();
        }

        // Top-level children
        if (!workspace.workspaceFolders?.length) {
            return [];
        }

        const results: PragmaTreeItem[] = [];

        for (let folder of workspace.workspaceFolders) {
            results.push(new PragmaWorkspace(folder));
        }

        return results;
    }
    getParent?(element: PragmaTreeItem): ProviderResult<PragmaTreeItem> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(
        item: PragmaTreeItem,
        element: PragmaTreeItem,
        token: CancellationToken
    ): ProviderResult<PragmaTreeItem> {
        throw new Error('Method not implemented.');
    }

    //#region Disposable
    private _disposed: Boolean = false;

    dispose() {
        if (this._disposed) {
            return;
        }

        this._disposed = true;
    }
    //#endregion
}
