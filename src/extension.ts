import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "al-pragma-explorer" is now active!');
    
    vscode.commands.executeCommand("setContext", "al-pragma-explorer.showPragmaExplorer", true);
}

export function deactivate() {}
