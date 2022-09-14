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
        this.id = folder.uri.fsPath;
        this.resourceUri = folder.uri;
    }

    async getChildren(): Promise<Pragma[]> {
        if (this.pragmas) {
            return this.pragmas;
        }

        const alFiles = await getFiles();
        const myFiles = alFiles.filter((uri) => workspace.getWorkspaceFolder(uri) === this.workspace);
        if (!myFiles.length) {
            return [];
        }

        const parseResults: PragmaParseResult[] = [];
        const uniqueIds: string[] = [];
        for (let file of myFiles) {
            const results = parse(file);
            for (let result of results) {
                if (uniqueIds.includes(result.id)) {
                    continue;
                }
                uniqueIds.push(result.id);
            }
            parseResults.push(...results);
        }

        this.pragmas = uniqueIds.map(id => {
            const uris: Uri[] = [];
            for (let result of parseResults) {
                if (result.id !== id) {
                    continue;
                }
                if (uris.includes(result.uri)) {
                    continue;
                }
                uris.push(result.uri);
            }
    
            return new Pragma(id, uris, this.workspace)
        });

        return this.pragmas;
    }
}
