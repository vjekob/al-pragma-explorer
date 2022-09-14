import { Pragma } from '../model/Pragma';
import { addPragma, getALApp, removePragma } from '../updater/updater';

export async function toggle(pragma: Pragma) {
    if (!pragma) {
        return;
    }

    const app = await getALApp(pragma.folder);
    if (!app) {
        return;
    }

    if (app.preprocessorSymbols?.includes(pragma.name)) {
        removePragma(pragma.folder, pragma.name);
    } else {
        addPragma(pragma.folder, pragma.name);
    }
}
