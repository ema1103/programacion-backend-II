import {Router} from 'express';
import { validateLogin } from '../middlewares/session.js';

const router = Router();

// Iniciar sesión
router.post('/login', validateLogin, async (req, res) => {
    try {
        req.session.user = req.user; // Guardamos el usuario que viene desde el middleware validateUser en la sesión.
        res.send({status: 'success', message: 'Login successful'}); // Devolvemos un mensaje de éxito.
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message}); // Si ocurre un error, devolvemos un error.
    }
});

// Cerrar sesión
router.post('/logout', async (req, res) => {
    try {
        // Destruimos la sesión.
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({status: 'error', message: 'Error al cerrar sesión'}); // Si ocurre un error, devolvemos un error.
            }
            res.clearCookie('connect.sid'); // Borramos la cookie de la sesión.
            res.redirect('/login'); // Redirigimos al login.
        });
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message}); // Si ocurre un error, devolvemos un error.
    }
});

export default router;