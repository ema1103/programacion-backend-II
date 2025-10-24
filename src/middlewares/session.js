import userModel from '../models/userModel.js';

async function validateLogin(req, res, next) {
    const {email, password} = req.body; // Obtenemos el email y la contraseña del usuario.

    try {
        if (!email || !password) {
            return res.status(400).send({status: 'error', message: 'Email and password are required'}); // Si el email o la contraseña no son proporcionados, devolvemos un error.
        }

        // Validamos si el usuario ya está logueado.
        if (req.session.user) {
            return res.status(400).send({status: 'error', message: 'User already logged in'}); 
        }

        // Validamos si el usuario existe.
        const user = await userModel.findOne({email}); 
        if (!user) {
            return res.status(404).send({status: 'error', message: 'User not found'}); // Si el usuario no existe, devolvemos un error.
        }

        // Validamos si la contraseña es correcta.
        if (req.user.password !== password) {
            return res.status(401).send({status: 'error', message: 'Invalid password'}); // Si la contraseña no es correcta, devolvemos un error.
        }

        req.user = user; // Guardamos el usuario en la request.

        next();
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message}); // Si ocurre un error, devolvemos un error.
    }
}

export {
    validateLogin
}