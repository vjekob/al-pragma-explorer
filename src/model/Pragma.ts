import { ThemeIcon, TreeItem, TreeItemCollapsibleState, Uri, workspace, WorkspaceFolder } from 'vscode';
import * as vscode from 'vscode';
import { ALObjectType } from './ALObjectType';
import { PragmaFile } from './PragmaFile';
import { PragmaParseResult } from './PragmaParseResult';
import { PragmaTreeItem } from './PragmaTreeItem';

export class Pragma extends TreeItem implements PragmaTreeItem {
    public folder: WorkspaceFolder;

    public name: string;
    public files?: PragmaFile[];

    constructor(id: string, pragmas: PragmaParseResult[] | undefined, parent: WorkspaceFolder) {
        super(id, TreeItemCollapsibleState.Collapsed);
        this.name = id;
        const settings = vscode.workspace.getConfiguration('al-pragma-explorer');
        this.iconPath = new ThemeIcon(settings.pragmaIcon);
        this.folder = parent;
        this.resourceUri = Uri.from({ scheme: 'alpragmas', authority: this.folder.name, path: `/${id}` });

        if (pragmas?.length) {
            this.files = pragmas.map((pragma) => new PragmaFile(pragma.uri, pragma.positions));
        }
        this.contextValue = "ispragma";
    }

    async getChildren(): Promise<PragmaFile[]> {
        if (!this.files) {
            return [];
        }
        return this.files;
    }
}
