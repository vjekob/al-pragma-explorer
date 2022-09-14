import { Uri, WorkspaceFolder } from 'vscode';

export interface ALApp {
    workspace: WorkspaceFolder;
    uri: Uri;
    id: string;
    name: string;
    publisher: string;
    preprocessorSymbols?: string[];
}
