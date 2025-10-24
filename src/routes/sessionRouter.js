import {Router} from 'express';
import userModel from '../models/userModel.js';

const router = Router();

// Iniciar sesión
router.post('/login', async (req, res) => {
    const {email, password} = req.body; // Obtenemos los datos del usuario.
    try {
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
        if (user.password !== password) {
            return res.status(401).send({status: 'error', message: 'Invalid password'}); // Si la contraseña no es correcta, devolvemos un error.
        }

        req.session.user = user; // Guardamos el usuario en la sesión.
        res.send({status: 'success', message: 'Login successful'}); // Devolvemos un mensaje de éxito.
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message}); // Si ocurre un error, devolvemos un error.
    }
});

// Cerrar sesión
router.post('/logout', async (req, res) => {
    try {
        req.session.destroy(); // Destruimos la sesión.
        res.clearCookie('connect.sid'); // Borramos la cookie de la sesión.
        res.redirect('/login'); // Redirigimos al login.
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message}); // Si ocurre un error, devolvemos un error.
    }
});

export default router;