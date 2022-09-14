import path = require('path');
import { Position, Range, ThemeIcon, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';
import { parse } from '../parser/parse';
import { ALObjectType } from './ALObjectType';
import { PragmaInstance } from './PragmaInstance';
import { PragmaTreeItem } from './PragmaTreeItem';

export class PragmaFile extends TreeItem implements PragmaTreeItem {
    private _pragma: string;

    public objectType: ALObjectType;
    public instances?: PragmaInstance[];

    constructor(uri: Uri, pragma: string) {
        const filename = path.basename(uri.fsPath);
        super(filename, TreeItemCollapsibleState.Collapsed);
        this.command = { command: "vscode.open", title: "", arguments: [uri] };

        this.resourceUri = uri;
        this.objectType = ALObjectType.Codeunit;
        this.iconPath = ThemeIcon.File;

        this._pragma = pragma;
    }

    getChildren(): PragmaInstance[] {
        if (this.instances) {
            return this.instances;
        }

        const pragmas = parse(this.resourceUri!).filter(p => p.id === this._pragma);
        
        this.instances = pragmas.map(pragma => new PragmaInstance(this.resourceUri!, pragma.position));
        return this.instances;
    }
}
