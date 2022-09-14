import { TreeItem, TreeItemCollapsibleState, Uri, WorkspaceFolder } from 'vscode';
import { Pragma } from './Pragma';
import { PragmaTreeItem } from './PragmaTreeItem';

export class PragmaWorkspace extends TreeItem implements PragmaTreeItem {
    public workspace: WorkspaceFolder;
    public pragmas?: Pragma[];

    constructor(folder: WorkspaceFolder) {
        super(folder.name, TreeItemCollapsibleState.Collapsed);

        this.workspace = folder;

        (this.id = folder.uri.fsPath), (this.resourceUri = folder.uri);
    }

    async getChildren(): Promise<Pragma[]> {
        if (this.pragmas) {
            return this.pragmas;
        }

        this.pragmas = [new Pragma('MOCK', this.workspace)];

        return this.pragmas;
    }
}
