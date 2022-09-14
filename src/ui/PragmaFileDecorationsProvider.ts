import  { Event, EventEmitter, FileDecorationProvider, ThemeColor, Uri, workspace } from "vscode";
import { getAlApp } from "../updater/updater";

export class PragmaFileDecorationsProvider implements FileDecorationProvider {
    onDidChangeFileDecorations?: Event<Uri | Uri[] | undefined> | undefined;
    private _onDidChangeFileDecorations?: EventEmitter<Uri | Uri[] | undefined> | undefined;

    async provideFileDecoration(uri: Uri) {
        if (uri.scheme !== "al-pragmas") {
            return;
        }

        const folder = workspace.workspaceFolders?.find(f => f.name === uri.authority);
        if (!folder) {
            return;
        }

        const app = await getAlApp(folder);

        const active = app?.preprocessorSymbols?.includes(uri.path.substring(1));
        return {
            color: new ThemeColor(active ? "gitDecoration.addedResourceForeground" : "disabledForeground"),
            badge: active ? "ON" : "",

        }
    }

    public refresh(uri: Uri) {
        this._onDidChangeFileDecorations?.fire(uri);
    }
}
