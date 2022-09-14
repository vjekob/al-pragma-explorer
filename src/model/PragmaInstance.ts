import { Range } from "vscode";

export interface PragmaInstance {
    range: Range;
}


/*
Workspace = workspace folder
- Pragma = identifier, e.g. CLEAN18
    - File = file path: e.g. My.Codeunit.al
        - Instance = line 18
*/