import { TreeItem, TreeItemCollapsibleState, Uri, workspace, WorkspaceFolder } from 'vscode';
import { getFiles } from '../parser/getFiles';
import { ALObjectType } from './ALObjectType';
import { PragmaFile } from './PragmaFile';
import { PragmaParseResult } from './PragmaParseResult';
import { PragmaTreeItem } from './PragmaTreeItem';

export class Pragma extends TreeItem implements PragmaTreeItem {
    private _parent: WorkspaceFolder;
    private _uris: Uri[];

    public name: string;
    public files?: PragmaFile[];

    constructor(id: string, uris: Uri[], parent: WorkspaceFolder) {
        super(id, TreeItemCollapsibleState.Collapsed);
        this.name = id;
        this._parent = parent;
        this._uris = uris;
    }

    async getChildren(): Promise<PragmaFile[]> {
        if (this.files) {
            return this.files;
        }

        this.files = this._uris.map<PragmaFile>((uri) => new PragmaFile(uri, this.name));
        return this.files;
    }
}
