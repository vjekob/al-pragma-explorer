import { getVSCodeDownloadUrl } from '@vscode/test-electron/out/util';
import path = require('path');
import { Position, Range, ThemeIcon, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';
import { parse } from '../parser/parse';
import { ALObjectType } from './ALObjectType';
import { PragmaInstance } from './PragmaInstance';
import { PragmaTreeItem } from './PragmaTreeItem';
import * as vscode from 'vscode';

export class PragmaFile extends TreeItem implements PragmaTreeItem {
    private _positions: vscode.Position[];

    public objectType: ALObjectType;
    public instances?: PragmaInstance[];

    constructor(uri: Uri, positions: vscode.Position[]) {
        const filename = path.basename(uri.fsPath);
        super(filename, TreeItemCollapsibleState.Collapsed);

        this._positions = positions;
        this.command = { command: 'vscode.open', title: '', arguments: [uri] };

        this.resourceUri = uri;
        this.objectType = ALObjectType.Codeunit;
        this.iconPath = ThemeIcon.File;
    }

    getChildren(): PragmaInstance[] {
        if (this.instances) {
            return this.instances;
        }

        this.instances = this._positions.map((position) => new PragmaInstance(this.resourceUri!, position));
        return this.instances;
    }
}
