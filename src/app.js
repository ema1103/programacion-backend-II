// Configuración de dotenv.
import dotenv from 'dotenv';
dotenv.config();

// Importamos las dependencias necesarias.
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session'; // Para manejar las sesiones del usuario.
import MongoStore from 'connect-mongo'; // Para manejar las sesiones en MongoDB.
import { engine } from 'express-handlebars'; // Para manejar las vistas con Handlebars.
import { initializePassport } from './config/passport.config.js'; // Para inicializar la autenticación.
import passport from 'passport'; // Para manejar la autenticación.

// Importamos los routers.
import userRouter from './routes/userRouter.js';
import sessionRouter from './routes/sessionRouter.js';
import viewRouter from './routes/viewRouter.js';

// Iniciamos el servidor.
const app = express();

// Configuración de Handlebars
app.engine('hbs', engine({
    extname: '.hbs', // Extensión de los archivos de las vistas.
    defaultLayout: 'layout', // Layout por defecto.
    layoutsDir: './src/views/', // Directorio de los layouts.
}));
app.set('view engine', 'hbs'); // Configuración de Handlebars.
app.set('views', './src/views'); // Directorio de las vistas.

// Iniciamos la conexión con MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri);

// Middlewares incorporados de Express
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({extended: true})); // Formatea query params de URLs para peticiones entrantes.
// Configuración de la sesión.
app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        mongoOptions: {
            useNewUrlParser: true, // Depreciado, pero necesario para la conexión con MongoDB.
            useUnifiedTopology: true, // Depreciado, pero necesario para la conexión con MongoDB.
        },
        ttl: 15, // 15 segundos
    }),
    secret: 'secret-key', // Clave secreta para encriptar la sesión.
    resave: false, // No re-guardar la sesión si no hay cambios.
    saveUninitialized: false, // No guardar la sesión si no hay cambios.
}));

// Inicializamos la autenticación.
initializePassport();
// Middleware de Passport para inicializar la autenticación.
app.use(passport.initialize());
// Middleware de Passport para manejar las sesiones.
app.use(passport.session());

// Configuración de los routers.
app.use('/', viewRouter); // Router de vistas en la ruta base
app.use('/api/users', userRouter); // Router de usuarios en la ruta /api/users
app.use('/api/sessions', sessionRouter); // Router de sesiones en la ruta /api/sessions

// Iniciamos el servidor.
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});
