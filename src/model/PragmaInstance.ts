import { Position, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { PragmaTreeItem } from './PragmaTreeItem';

export class PragmaInstance extends TreeItem implements PragmaTreeItem {
    public position: Position;

    constructor(position: Position) {
        super(`Line ${position.line + 1}`, TreeItemCollapsibleState.None);
        this.position = position;
    }

    getChildren() {
        return [];
    }
}
