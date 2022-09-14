import { Range, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { PragmaTreeItem } from './PragmaTreeItem';

export class PragmaInstance extends TreeItem implements PragmaTreeItem {
    public range: Range;

    constructor(range: Range) {
        super(`Line ${range.start.line + 1}`, TreeItemCollapsibleState.None);
        this.range = range;
    }

    getChildren() {
        return [];
    }
}
