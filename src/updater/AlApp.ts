import { Uri, WorkspaceFolder } from 'vscode';

export interface AlApp {
    workspace: WorkspaceFolder;
    uri: Uri;
    id: string;
    name: string;
    publisher: string;
    preprocessorSymbols: string[];
}
