import { Position, Range, Uri } from 'vscode';

export interface PragmaParseResult {
    uri: Uri;
    id: string;
    positions: Position[];
}
