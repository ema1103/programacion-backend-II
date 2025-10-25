import {Router} from 'express';
import { validateLogin } from '../middlewares/session.js';
import passport from 'passport';

const router = Router();

// Iniciar sesión
router.post('/login', 
    passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), 
    validateLogin, 
    async (req, res) => {
        req.session.user = req.user; // Guardamos el usuario que viene desde el middleware validateUser en la sesión.
        res.send({status: 'success', message: 'Login successful'}); // Devolvemos un mensaje de éxito.
});

router.get('/faillogin', (req, res) => {
    res.send({status: 'error', message: 'Login failed'}); // Devolvemos un mensaje de error.
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

router.post('/register', 
    passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), 
    async (req, res) => {
        res.send({status: 'success', message: 'Register successful'}); // Devolvemos un mensaje de éxito.
});

router.get('/failregister', (req, res) => {
    res.send({status: 'error', message: 'Register failed ||| User already exists'}); // Devolvemos un mensaje de error.
});

export default router;