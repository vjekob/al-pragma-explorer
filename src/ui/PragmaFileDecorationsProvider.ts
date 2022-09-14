import  { Event, EventEmitter, FileDecorationProvider, ThemeColor, Uri, workspace } from "vscode";
import { getALApp } from "../updater/updater";

export class PragmaFileDecorationsProvider implements FileDecorationProvider {
    private _onDidChangeFileDecorations: EventEmitter<Uri | Uri[] | undefined> = new EventEmitter<Uri | Uri[] | undefined>();
    onDidChangeFileDecorations?: Event<Uri | Uri[] | undefined> = this._onDidChangeFileDecorations.event;

    async provideFileDecoration(uri: Uri) {
        if (uri.scheme !== "al-pragmas") {
            return;
        }

        const folder = workspace.workspaceFolders?.find(f => f.name === uri.authority);
        if (!folder) {
            return;
        }

        const app = await getALApp(folder);

        const active = app?.preprocessorSymbols?.includes(uri.path.substring(1));
        return {
            color: new ThemeColor(active ? "gitDecoration.addedResourceForeground" : "disabledForeground"),
            badge: active ? "ON" : "",
        }
    }

    public refresh() {
        this._onDidChangeFileDecorations.fire(undefined);
    }
}
