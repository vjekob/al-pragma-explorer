import { Uri } from "vscode";
import { ALObjectType } from "./ALObjectType";
import { PragmaInstance } from "./PragmaInstance";

export interface PragmaFile {
    uri: Uri;
    name: string;
    objectType: ALObjectType;
    instances: PragmaInstance[];
}
