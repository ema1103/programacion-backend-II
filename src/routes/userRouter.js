import {Router} from 'express'; // Para crear el router.
import userModel from '../models/userModel.js'; // Para el modelo de usuarios.

const router = Router();


// Consultar todos los usuarios
router.get('/', async (req, res) => {

    try {
        const result = await userModel.find(); // Buscamos todos los usuarios en la base de datos.
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

// Consultar un usuario por su id
router.get('/:uid', async (req, res) => {
    const uid = req.params.uid; // Obtenemos el id del usuario.
    try {
        const result = await userModel.findOne({_id: uid}); // Buscamos el usuario por su id.
        res.send({status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({status: 'error', message: error.message});
    }
});

// Crear un usuario
router.post('/', async (req, res) => {
    
    const {first_name, last_name, age, email, password} = req.body; // Obtenemos los datos del usuario.
    try {
        const result = await userModel.create({first_name, last_name, age, email, password}); // Creamos el usuario en la base de datos.
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

// Actualizar un usuario
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid; // Obtenemos el id del usuario.
    const {first_name, last_name, age, email, password} = req.body; // Obtenemos los datos del usuario.
    try {
        const user = await userModel.findOne({_id: uid}); // Buscamos el usuario por su id.
        if (!user) return res.status(404).send({status: 'error', message: 'User not found'}); // Si el usuario no existe, devolvemos un error.

        const newUser = { // Creamos el nuevo usuario.
            name: name ?? user.name, // Si no se proporciona un nombre, usamos el nombre del usuario existente.
            age: age ?? user.age, // Si no se proporciona una edad, usamos la edad del usuario existente.
            email: email ?? user.email, // Si no se proporciona un email, usamos el email del usuario existente.
            password: password ?? user.password // Si no se proporciona una contraseña, usamos la contraseña del usuario existente.
        };

        const updateUser = await userModel.updateOne({_id: uid}, newUser); // Actualizamos el usuario en la base de datos.
        res.send({
            status: 'success',
            payload: updateUser
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

// Eliminar un usuario
router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const result = await userModel.deleteOne({_id: uid});
        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;