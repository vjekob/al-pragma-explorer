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

    constructor(id: string, pragmas: PragmaParseResult[] | undefined, parent: WorkspaceFolder) {
        super(id, TreeItemCollapsibleState.Collapsed);
        this.name = id;
        this._parent = parent;

        if (pragmas?.length) {
            this.files = pragmas.map((pragma) => new PragmaFile(pragma.uri, pragma.positions));
        }
    }

    async getChildren(): Promise<PragmaFile[]> {
        if (!this.files) {
            return [];
        }
        return this.files;
    }
}
