import { Position, Range, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';
import { PragmaTreeItem } from './PragmaTreeItem';

export class PragmaInstance extends TreeItem implements PragmaTreeItem {
    public position: Position;

    constructor(uri: Uri, position: Position) {
        super(`Line ${position.line + 1}`, TreeItemCollapsibleState.None);
        this.position = position;
        this.command = {
            command: 'vscode.open',
            arguments: [uri, { selection: new Range(position, position) }],
            title: '',
        };
    }

    getChildren() {
        return [];
    }
}
