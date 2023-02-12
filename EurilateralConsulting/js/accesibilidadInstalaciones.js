document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById('acces');


    boton.addEventListener('click', function () {

        const arrayLabels = document.querySelectorAll("div.accesibilidad1");
        //const indicadores = document.querySelectorAll("#indicador");


        if (sessionStorage.getItem('acces') === null) {

            sessionStorage.setItem("acces", JSON.stringify("1"))


            arrayLabels.forEach(label => {
                label.classList.add("labelCarrusel");
            });

            // indicadores.forEach(indicador => {
            //     indicador.style.display = "block";
            // });


        } else {

            sessionStorage.removeItem("acces");
            arrayLabels.forEach(label => {
                label.classList.remove("labelCarrusel");
            });

            // indicadores.forEach(indicador => {
            //     indicador.style.display = "none";
            // });
        }


    });

});