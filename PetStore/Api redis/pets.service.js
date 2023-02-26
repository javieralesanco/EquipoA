import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

const client = createClient({
    url: 'redis://default:123pass@localhost:5000'
});

await client.connect();


export async function getAllPets() {
    const data = await client.get("Pets");
    return JSON.parse(data ?? '[]');
}

export async function getPet(id) {
    const pets = await getAllPets();
    for (let i = 0; i < pets.length; i++)
        if (pets[i].id === id)
            return pets[i];
    return null;
}

export async function insertPet(pet) {
    const pets = await getAllPets();
    if (pets === null || pets === undefined)
        pets = [];
    pet.id = uuidv4();
    pets.push(pet);
    await client.set("Pets", JSON.stringify(pets));
    return pet;
}

export async function deletePet(id) {
    const pets = await getAllPets();
    const newPets = pets.filter(function (value) {
        return value.id !== id;
    });
    if (pets.length != newPets.length) {
        await client.set("Pets", JSON.stringify(newPets));
        return true;
    }
    return false;
}

export async function modifyPet(newPet) {
    const pets = await getAllPets();
    for (let i = 0; i < pets.length; i++)
        if (pets[i].id === newPet.id) {
            pets[i] = newPet;
            await client.set("Pets", JSON.stringify(pets));
            return true;
        }
    return false;
}

async function getAllUsers() {
    const data = await client.get("Users");
    return JSON.parse(data ?? '[]');
}

export async function getUser(username) {
    const users = await getAllUsers();
    for (let i = 0; i < users.length; i++)
        if (users[i].username === username)
            return users[i];
    return null;
}

export async function insertUser(user) {
    const users = await getAllUsers();
    const prueba = await getUser(user.username);
    if (users === null || users === undefined)
        users = [];
    if (prueba != null)
        return false;
    users.push(user);
    await client.set("Users", JSON.stringify(users));
    return user;
}

export async function validar(username, pass) {
    const users = await getAllUsers();
    users.forEach(element => {
        if (value.username == username && value.pass == pass)
            return true;
    });
    return false;
}

export async function deleteUser(username) {
    const users = await getAllUsers();
    const newUsers = users.filter(function (value) {
        return value.username !== username;
    });
    if (users.length != newUsers.length) {
        await client.set("Users", JSON.stringify(newUsers));
        return true;
    }
    return false;
}