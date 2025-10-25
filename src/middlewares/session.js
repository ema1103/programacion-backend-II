import { isValidPassword } from '../utils.js';

async function validateLogin(req, res, next) {
    const {password} = req.body; // Obtenemos la contraseña del usuario.

    try {
        // Validamos si el usuario ya está logueado.
        if (req.session.user) {
            return res.status(400).send({status: 'error', message: 'User already logged in'}); 
        }

        // Validamos si el usuario existe.
        const user = req.user; //Obtenemos el ususario que viene desde el deserializeUser.
        if (!user) {
            return res.status(404).send({status: 'error', message: 'User not found'}); // Si el usuario no existe, devolvemos un error.
        }

        // Validamos si la contraseña es correcta.
        if (!isValidPassword({ user, password })) {
            return res.status(401).send({status: 'error', message: 'Invalid password'}); // Si la contraseña no es correcta, devolvemos un error.
        }

        next();
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message}); // Si ocurre un error, devolvemos un error.
    }
}

export {
    validateLogin
}