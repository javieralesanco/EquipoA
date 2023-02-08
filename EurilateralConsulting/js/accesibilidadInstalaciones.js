document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById('acces');


    boton.addEventListener('click', function () {

        const arrayLabels = document.querySelectorAll("div.accesibilidad1");

        if (localStorage.getItem('acces') === null) {

            localStorage.setItem("acces", JSON.stringify("1"))


            arrayLabels.forEach(label => {
                label.classList.add("labelCarrusel");
            });


        } else {

            localStorage.removeItem("acces");
            arrayLabels.forEach(label => {
                label.classList.remove("labelCarrusel");
            });
        }


    });

});