import { TreeItem } from "vscode";

export interface PragmaTreeItem extends TreeItem {
    getChildren: () => PragmaTreeItem[] | Promise<PragmaTreeItem[]>;
}
