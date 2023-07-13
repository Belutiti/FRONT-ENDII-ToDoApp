if (!localStorage.jwt) {
  location.replace("./index.html");
}

const token = JSON.parse(localStorage.jwt);
const urlDatosUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
const urlTareas = "https://todo-api.ctd.academy/v1/tasks";
const btnCerrarSesion = document.querySelector("#closeApp");
const formCrearTarea = document.querySelector(".nueva-tarea");
const tareasPendientes = document.querySelector(".tareas-pendientes");
const tareasTerminadas = document.querySelector(".tareas-terminadas");

function obtenerNombreUsuario() {
  const nombre = document.querySelector(".user-info p");

  const settings = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  console.log("Consultando usuario...");

  fetch(urlDatosUsuario, settings)
    .then((response) => response.json())
    .then((data) => {
      console.log("Nombre del Usuario: ");
      console.log(data.firstName);
      nombre.innerHTML = data.firstName;
    })
    .catch((error) => console.log(error));
}

obtenerNombreUsuario();
renderizarTareas();

let tasksApi = [];

function renderizarTareas() {
  tareasPendientes.innerHTML = "";
  tareasTerminadas.innerHTML = "";

  const settings = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  fetch(urlTareas, settings)
    .then((response) => response.json())
    .then((data) => {
      tasksApi = data;
      console.log(data);
      tasksApi.forEach((task) => {
        let fecha = new Date(task.createdAt);

        if (!task.completed) {
          tareasPendientes.innerHTML += `
        <li class="tarea">
          <button class="change" id="${task.id}">
            <i class="fa-regular fa-circle"></i>
          </button>
          <div class="descripcion">
            <p class="nombre">${task.description}</p>
            <p class="timestamp">${fecha.toLocaleDateString()}</p>
          </div>
        </li> `;
        } else {
          tareasTerminadas.innerHTML += `
        <li class="tarea">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${task.description}</p>
          <div class="cambios-estados">
            <button class="change incompleta" id="${task.id}" >
              <i class="fa-solid fa-rotate-left"></i>
            </button>
            <button class="borrar" id="${task.id}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </li>`;
        }
      });
      botonCambioEstado();
      eliminarTarea();
    });
}

function botonCambioEstado() {
  const botonCambioEstado = document.querySelectorAll(".change");

  botonCambioEstado.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      console.log("Cambiando tareas");

      const id = event.target.id;
      const url = `${urlTareas}/${id}`;
      const payload = {};

      if (event.target.classList.contains("incompleta")) {
        payload.completed = false;
      } else {
        payload.completed = true;
      }

      const settingsCambio = {
        method: "PUT",
        headers: {
          authorization: token,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      fetch(url, settingsCambio).then((response) => {
        console.log(response.status);
        renderizarTareas();
      });
    });
  });
}

btnCerrarSesion.addEventListener("click", function () {
  Swal.fire({
    title: "Desea cerrar sesion?",
    showDenyButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      Swal.fire("Hasta luego!");
      setTimeout(function () {
        localStorage.clear();
        location.replace("./index.html");
      }, 2000);
    }
  });
});

formCrearTarea.addEventListener("submit", function (event) {
  event.preventDefault();
  const nuevaTarea = document.querySelector("#nuevaTarea");

  const payload = {
    description: nuevaTarea.value,
    completed: false,
  };

  const settings = {
    method: "POST",
    headers: {
      authorization: token,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  fetch(urlTareas, settings)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        renderizarTareas();
        formCrearTarea.reset();
      }
    })
    .catch((error) => console.log(error));
});

function eliminarTarea() {
  const botonBorrar = document.querySelectorAll(".borrar");

  botonBorrar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      if (event.target.classList.contains("borrar")) {
        Swal.fire({
          title: "Confirma eliminar la tarea?",
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            const id = event.target.id;
            const url = `${urlTareas}/${id}`;

            const payload = {};

            const settingsDelete = {
              method: "DELETE",
              headers: {
                authorization: token,
                "content-type": "application/json",
              },
              body: JSON.stringify(payload),
            };

            fetch(url, settingsDelete)
              .then((response) => response.json())
              .then((data) => {
                if (data) {
                  renderizarTareas();
                }
              });
            Swal.fire("Tarea eliminada");
          }
        });
      }
    });
  });
}
