import {
    CancellationToken,
    Disposable,
    Event,
    EventEmitter,
    ProviderResult,
    TreeDataProvider,
    TreeItem,
    Uri,
    window,
    workspace,
} from 'vscode';
import { PragmaTreeItem } from '../model/PragmaTreeItem';
import { PragmaWorkspace } from '../model/PragmaWorkspace';
import { PragmaFileDecorationsProvider } from './PragmaFileDecorationsProvider';

export class PragmaViewProvider implements Disposable, TreeDataProvider<PragmaTreeItem> {
    private _decorationsProvider: PragmaFileDecorationsProvider;

    private _onDidChangeTreeData: EventEmitter<null> = new EventEmitter<null>();
    readonly onDidChangeTreeData: Event<null> = this._onDidChangeTreeData.event;

    constructor() {
        this._disposables.push(workspace.onDidChangeWorkspaceFolders((change) => this.refresh()));

        const watcher = workspace.createFileSystemWatcher('{**/*.al,**/app.json}', false, false, false);
        this._disposables.push(watcher);

        watcher.onDidChange((e) => this.refresh());
        watcher.onDidCreate((e) => this.refresh());
        watcher.onDidDelete((e) => this.refresh());

        this._decorationsProvider = new PragmaFileDecorationsProvider();
        this._disposables.push(window.registerFileDecorationProvider(this._decorationsProvider));
    }

    private getPragmaUriFromUri(uri: Uri) {
        const folder = workspace.getWorkspaceFolder(uri);
        return Uri.from({ scheme: 'alpragmas', authority: folder?.name });
    }

    private refresh() {
        this._onDidChangeTreeData.fire(null);
        this._decorationsProvider.refresh();
    }

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
    private _disposables: Disposable[] = [];

    dispose() {
        if (this._disposed) {
            return;
        }

        for (let disposable of this._disposables) {
            disposable.dispose();
        }

        this._disposed = true;
    }
    //#endregion
}
