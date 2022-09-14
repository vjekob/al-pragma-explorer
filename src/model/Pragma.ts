import { TreeItem, TreeItemCollapsibleState, Uri, workspace, WorkspaceFolder } from 'vscode';
import { getFiles } from '../parser/getFiles';
import { ALObjectType } from './ALObjectType';
import { PragmaFile } from './PragmaFile';
import { PragmaTreeItem } from './PragmaTreeItem';

export class Pragma extends TreeItem implements PragmaTreeItem {
    private _parent: WorkspaceFolder;

    public name: string;
    public files?: PragmaFile[];

    constructor(pragma: string, parent: WorkspaceFolder) {
        super(pragma, TreeItemCollapsibleState.Collapsed);
        this.name = pragma;
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
