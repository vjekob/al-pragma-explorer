import { Uri, WorkspaceFolder } from 'vscode';
import * as fs from 'fs';
import { ALApp } from './ALApp';

function getPath(folder: WorkspaceFolder) {
    return `${folder.uri?.fsPath}/app.json`;
}

export async function getALApp(folder: WorkspaceFolder): Promise<ALApp | undefined> {
    if (!folder) {
        return;
    }
    const uri = Uri.file(getPath(folder));

    try {
        const appRaw = await new Promise<Buffer | NodeJS.ErrnoException>((resolve) => {
            fs.readFile(uri.fsPath, (err, data) => {
                resolve(err || data);
            });
        });
        if (!(appRaw instanceof Buffer)) {
            return;
        }
        return JSON.parse(appRaw.toString());
    } catch (err) {
        return;
    }
}

export async function addPragma(folder: WorkspaceFolder, pragma: string) {
    if (!folder) {
        return;
    }
    const uri = Uri.file(getPath(folder));
    const app = await getALApp(folder);

    if (!app) {
        return;
    }

    if (!app.preprocessorSymbols) {
        app.preprocessorSymbols = [];
    }

    if (app.preprocessorSymbols.indexOf(pragma) === -1) {
        app.preprocessorSymbols.push(pragma);
        fs.writeFile(uri.fsPath, JSON.stringify(app, null, 2), (err) => {
            if (err) return console.log(err);
        });
    }
}

export async function removePragma(folder: WorkspaceFolder, pragma: string) {
    if (!folder) {
        return;
    }
    const uri = Uri.file(getPath(folder));
    const app = await getALApp(folder);

    if (!app) {
        return;
    }

    if (!app.preprocessorSymbols) {
        return;
    }

    let updateFile = false;

    let index = -1;
    while ((index = app.preprocessorSymbols.indexOf(pragma)) > -1) {
        app.preprocessorSymbols.splice(index, 1);
        if (!updateFile) {
            updateFile = true;
        }
    }

    if (updateFile) {
        fs.writeFile(uri.fsPath, JSON.stringify(app, null, 2), (err) => {
            if (err) return console.log(err);
        });
    }
}
