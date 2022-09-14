import { TreeItem, TreeItemCollapsibleState, Uri, workspace, WorkspaceFolder } from 'vscode';
import { getFiles } from '../parser/getFiles';
import { parse } from '../parser/parse';
import { Pragma } from './Pragma';
import { PragmaParseResult } from './PragmaParseResult';
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

        const alFiles = await getFiles();
        const myFiles = alFiles.filter((uri) => workspace.getWorkspaceFolder(uri) === this.workspace);

        const pragmas: PragmaParseResult[] = [];
        for (let file of myFiles) {
            pragmas.push(...parse(file));
        }

        this.pragmas = pragmas.map(pragma => new Pragma(pragma, this.workspace));

        return this.pragmas;
    }
}
