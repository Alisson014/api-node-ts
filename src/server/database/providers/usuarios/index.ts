import * as create from './create.js';
import * as getBiEmail from './getByEmail.js';

export const UsuariosProvider = {
    ...create,
    ...getBiEmail,
};