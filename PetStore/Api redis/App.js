import express from 'express';
import cors from 'cors';
import { getCars, getCarByID, getCarByNumBastidor, insertCar, deleteCar, modifyCar } from './cars.service.js';
import bodyParser from 'body-parser';

const app = express();
const port = 42069;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/pets', async (req, res) => {
    res.status(200).json(await getAllPets());
});

app.get('/pets/:id', async (req, res) => {
    const id = req.params.id;

    const pet = await getPet(id);

    if (pet) {
        res.status(200).json(pet);
        return;
    }

    res.status(404).send('Car not found');
});

app.post('/pets', async (req, res) => {
    const pet = req.body;

    const petDb = await getPet(pet.id);

    if (petDb) {
        res.status(400).send("La mascota ya esta definida en la bd");
        return;
    }

    const newPet = await insertPet(pet);
    if (newPet) {
        res.json(pet);
        return;
    }
    res.status(400).send('Error en la inserción de la mascota');
});

app.delete('/pets/:id', async (req, res) => {
    const id = req.params.id;

    if (await deletePet(id)) {
        res.send('La mascota ha sido eliminada');
        return;
    }

    res.status(404).send('Mascota no encontada');
});

app.put('/pets/:id', async (req, res) => {
    const id = req.params.id;
    const newPet = req.body;

    if (newPet.id !== id) {
        res.status(400).send('El id especificado en los parámetros no coincide');
        return;
    }

    const pet = await getPet(id);

    if (pet === null || pet === undefined) {
        res.status(400).json("Mascota no encontada");
        return;
    }

    if (await modifyPet(newPet)) {
        res.json(newPet);
        return;
    }

    res.status(404).send('Mascota no encontada');
});

app.post('/user', async (req, res) => {
    const user = req.body;

    const userDb = await getUser(user.username);

    if (userDb) {
        res.status(400).send("El usuario con el nick especificado ya existe");
        return;
    }

    const newUser = await insertUser(user);
    if (newUser) {
        res.json(user);
        return;
    }
    res.status(400).send('Error en la inserción del usuario');
});

app.get('/user/validar', async (req, res) => {
    const user = req.body;

    if (validar(user.username, user.pass)) {
        res.status(200).json(user);
        return;
    }
    res.status(400).send('Usuario o contraseña incorrectos');
    //activar mensaje de error en el front

});

app.delete('/user/:username', async (req, res) => {
    const username = req.params.username;

    if (await deleteUser(username)) {
        res.send('El usuario ha sido eliminado');
        return;
    }

    res.status(404).send('Usuario no encontrado');
});

app.get('/user/:username', async (req, res) => {
    const username = req.params.username;

    const user = getUser(username);
    if (user) {
        res.status(200).json(user);
        return;
    }

    res.status(404).send('Usuario no encontrado');
});


app.listen(port, () => console.log(`API Rest starts at ${port}!`));