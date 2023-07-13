window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const form= document.querySelector('form')
  const url= "https://todo-api.ctd.academy/v1"

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const payload = {
      email: email.value,
      password: password.value,
    };

    const settings = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    realizarLogin(settings)
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(settings) {
    fetch(`${url}/users/login`, settings)
    .then(response=>{
        console.log(response)
        if(!response.ok){
            alert("Alguno de los datos es incorrecto")
        }
        return response.json()
    })
    .then(data=>{
        console.log("Promesa cumplida")
        console.log(data)
        if(data.jwt){
            localStorage.setItem("jwt", JSON.stringify(data.jwt))
            console.log(localStorage)
            location.replace('./mis-tareas.html')
        }
    })
  }
});
