import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * With ESM, the globals bellow,
 * have to be recreated
 * */
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
