import path = require('path');
import { Position, Range, ThemeIcon, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';
import { ALObjectType } from './ALObjectType';
import { PragmaInstance } from './PragmaInstance';
import { PragmaTreeItem } from './PragmaTreeItem';

export class PragmaFile extends TreeItem implements PragmaTreeItem {
    public objectType: ALObjectType;
    public instances?: PragmaInstance[];

    constructor(uri: Uri) {
        const filename = path.basename(uri.fsPath);
        super(filename, TreeItemCollapsibleState.Collapsed);
        this.command = { command: "vscode.open", title: "", arguments: [uri] };

        this.resourceUri = uri;
        this.objectType = ALObjectType.Codeunit;
        this.iconPath = ThemeIcon.File;
    }

    getChildren(): PragmaInstance[] {
        if (this.instances) {
            return this.instances;
        }

        this.instances = [new PragmaInstance(new Range(new Position(0, 0), new Position(0, 5)))];
        return this.instances;
    }
}
