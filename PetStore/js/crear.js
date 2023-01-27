


document.addEventListener("DOMContentLoaded", async function () {
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
    const idpet = Math.floor(Math.random()*10000000000000);


    



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
    const data = await postData('https://petstore.swagger.io/v2/pet', pet);
    console.log(data);
    form.submit();
  }, false);
});

// Ejemplo implementando el metodo POST:
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