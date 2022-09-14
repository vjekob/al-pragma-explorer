import { Position, Range, Uri } from 'vscode';
import { PragmaParseResult } from '../model/PragmaParseResult';
import * as fs from 'fs';

export function parse(uri: Uri): PragmaParseResult[] {
    const contents = fs.readFileSync(uri.fsPath).toString();
    const lines = contents.split('\n');

    const results: PragmaParseResult[] = [];

    for (let line = 0; line < lines.length; line++) {
        let lineStr = lines[line];
        const lineStrTrimmed = lineStr.trim();
        if (!lineStrTrimmed.startsWith('#')) {
            continue;
        }

        let lineUppercase = lineStr.toUpperCase();
        let character = lineUppercase[0] === '#' ? 0 : lineUppercase.indexOf('#');
        const ifPos = lineUppercase.indexOf('#IF ');
        let pos = ifPos + 3;
        if (ifPos !== character) {
            const elifPos = lineUppercase.indexOf('#ELIF ');
            if (elifPos !== character) {
                continue;
            }
            pos = elifPos + 5;
        }

        lineUppercase = lineUppercase.substring(pos);
        let comment = lineUppercase.indexOf('//');
        if (comment >= 0) {
            lineUppercase = lineUppercase.substring(0, comment);
        }

        const parts = lineUppercase.split(' ');
        for (let part of parts) {
            results.push({
                uri,
                id: part,
                position: new Position(line, character),
            });
        }
    }

    return results;
}
