import * as vscode from 'vscode';
import { PragmaViewProvider } from './ui/PragmaViewProvider';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.window.registerTreeDataProvider("al-pragma-explorer.view", new PragmaViewProvider));
    vscode.commands.executeCommand("setContext", "al-pragma-explorer.showPragmaExplorer", true);
}

export function deactivate() {
    vscode.commands.executeCommand("setContext", "al-pragma-explorer.showPragmaExplorer", false);
}
