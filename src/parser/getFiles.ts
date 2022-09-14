import { workspace, WorkspaceFolder } from 'vscode';
import { ALObjectType } from '../model/ALObjectType';
import { Pragma } from '../model/Pragma';
import { PragmaFile } from '../model/PragmaFile';

export async function getFiles() {
    const alFiles = await workspace.findFiles('**/*.al');
    return alFiles;
}
