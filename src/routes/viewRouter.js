import express from 'express';

const router = express.Router();

// Ruta principal - redirige al login
router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    res.redirect('/login');
});

// Vista de login
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    res.render('login', { title: 'Login' });
});

// Vista de registro
router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    res.render('register', { title: 'Registro' });
});

// Vista de perfil
router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const user = req.session.user || null;
    res.render('profile', { title: 'Perfil', user });
});

export default router;
