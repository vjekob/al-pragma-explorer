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
        lineUppercase = lineUppercase.split('//')[0]; //get rid off comments
        lineUppercase = lineUppercase.replace(/[(]/g, ' ');
        lineUppercase = lineUppercase.replace(/[)]/g, ' ');

        const parts = lineUppercase.split(' ');
        for (let part of parts) {
            part = part.trim();
            if (!!part && part !== 'AND' && part !== 'OR') {
                const result = results.find((result) => result.id === part);
                if (result) {
                    result.positions.push(new Position(line, character));
                } else {
                    results.push({
                        uri,
                        id: part,
                        positions: [new Position(line, character)],
                    });
                }
            }
        }
    }

    return results;
}
