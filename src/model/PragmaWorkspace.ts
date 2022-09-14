import { Uri, WorkspaceFolder } from "vscode";
import { Pragma } from "./Pragma";

export interface PragmaWorkspace {
    workspace: WorkspaceFolder;
    pragmas: Pragma[];
}
