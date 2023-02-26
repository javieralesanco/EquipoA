import { checker } from "./checker.js";

document.addEventListener("DOMContentLoaded", function () {
  checker();
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelector('#form')

  form.addEventListener('submit', async (event) => {

    form.classList.add('was-validated')
    event.preventDefault()
    event.stopPropagation()

    if (!form.checkValidity()) {
      return;
    }
    const categoria = document.querySelector("#categorypet").value;
    const dogName = document.querySelector("#namepet").value;
    const tags = document.querySelector('#tagpet').value;
    const status = document.querySelector('#statuspet').value;
    const fotopet = document.querySelector('#fotopet').value;
    const idpet = Math.floor(Math.random() * 10000000000000);

    const pet = {
      id: idpet,
      category: {
        name: categoria
      },
      name: dogName,
      photoUrls: [
        fotopet
      ],
      tags: [
        {
          name: tags
        }
      ],
      status: status
    };

    localStorage.setItem('BD', document.getElementById('BBDD').value);
    switch (localStorage.getItem('BD')) {
      case 'Redis':
        const data = await postData('https://localhost:42069/pet', pet);
        console.log(data);
        form.submit();
        break;
      case 'IndexedDB':
        //TODO
        break;
      case 'SessionStorage':
        let petsS = JSON.parse(sessionStorage.getItem('Pets')) ?? [];
        petsS.forEach(element => {
          if (element.id == pet.id)
            return;
        });
        petsS.push(pet);
        sessionStorage.setItem('Pets', JSON.stringify(petsS));
        console.log(pet);
        form.submit();
        break;
      case 'LocalStorage':
        let petsL = JSON.parse(localStorage.getItem('Pets')) ?? [];
        petsL.forEach(element => {
          if (element.id == pet.id)
            return;
        });
        petsL.push(pet);
        localStorage.setItem('Pets', JSON.stringify(petsL));
        console.log(pet);
        form.submit();
        break;
    }
  }, false);
});

async function postData(url = '', data = {}) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch(error => {
    {
      new bootstrap.Modal(document.getElementById('exampleModal')).show();
      console.log(error)
    }
  })
    .then(response => response.json());
}