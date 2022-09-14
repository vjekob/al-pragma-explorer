import * as vscode from 'vscode';
import { toggle } from './commands/toggle';
import { PragmaViewProvider } from './ui/PragmaViewProvider';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.window.registerTreeDataProvider("al-pragma-explorer.view", new PragmaViewProvider));
    context.subscriptions.push(vscode.commands.registerCommand("al-pragma-explorer.toggle", toggle));
    
    vscode.commands.executeCommand("setContext", "al-pragma-explorer.showPragmaExplorer", true);
}

export function deactivate() {
    vscode.commands.executeCommand("setContext", "al-pragma-explorer.showPragmaExplorer", false);
}
