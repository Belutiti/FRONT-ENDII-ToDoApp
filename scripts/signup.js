window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const url = "https://todo-api.ctd.academy/v1"
  const form= document.querySelector('form')

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const payload = {
      firstName: nombre.value,
      lastName: apellido.value,
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

    realizarRegister(settings);
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
fetch(`${url}/users`, settings)
    .then(response=>{
console.log(response)
if(!response.ok){
    alert('Alguno de los datos es incorrecto')
}
return response.json()
    })
    .then(data=>{
        console.log('Promesa cumplida')
        console.log(data)
        if(data.jwt){
            localStorage.setItem("jwt", JSON.stringify(data.jwt))
            location.replace('./index.html')
        }
    })
}

})



