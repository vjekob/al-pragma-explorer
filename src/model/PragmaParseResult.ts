import { Position, Range, Uri } from "vscode";

export interface PragmaParseResult {
    uri: Uri;
    id: string;
    position: Position;
}
