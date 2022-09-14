import { TreeItem, TreeItemCollapsibleState, Uri, workspace, WorkspaceFolder } from 'vscode';
import { getFiles } from '../parser/getFiles';
import { ALObjectType } from './ALObjectType';
import { PragmaFile } from './PragmaFile';
import { PragmaParseResult } from './PragmaParseResult';
import { PragmaTreeItem } from './PragmaTreeItem';

export class Pragma extends TreeItem implements PragmaTreeItem {
    private _parent: WorkspaceFolder;

    public name: string;
    public files?: PragmaFile[];

    constructor(pragma: PragmaParseResult, parent: WorkspaceFolder) {
        super(pragma.id, TreeItemCollapsibleState.Collapsed);
        this.name = pragma.id;
        this._parent = parent;
    }

    async getChildren(): Promise<PragmaFile[]> {
        if (this.files) {
            return this.files;
        }

        const alFiles = await getFiles();
        this.files = alFiles
                .filter((uri) => workspace.getWorkspaceFolder(uri) === this._parent)
                .map<PragmaFile>((uri) => new PragmaFile(uri));
        return this.files;
    }
}
