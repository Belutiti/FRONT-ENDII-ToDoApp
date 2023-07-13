# FRONT-ENDII-ToDoApp

Aplicación de Tareas
Esta aplicación de tareas permite a los usuarios iniciar sesión, crear, reponer y borrar tareas utilizando una API. También se proporciona la funcionalidad de cerrar sesión. La aplicación está desarrollada utilizando HTML, CSS y JavaScript, y se han utilizado las siguientes bibliotecas:

SweetAlert2: Biblioteca de JavaScript utilizada para mostrar mensajes y alertas interactivas en la aplicación.
Font Awesome: Biblioteca de iconos utilizada para agregar iconos a los elementos de la interfaz de usuario.

Funcionalidades

Iniciar sesión: Permite a los usuarios iniciar sesión en la aplicación.
Crear tarea: Permite a los usuarios crear nuevas tareas.
Reponer tarea: Permite a los usuarios reponer tareas existentes.
Borrar tarea: Permite a los usuarios eliminar tareas existentes.
Cerrar sesión: Permite a los usuarios cerrar sesión en la aplicación.

Tecnologías utilizadas

HTML: Se utiliza para estructurar la interfaz de usuario.
CSS: Se utiliza para dar estilo y diseño a la interfaz de usuario.
JavaScript: Se utiliza para agregar interactividad y funcionalidad a la aplicación.

Bibliotecas utilizadas
SweetAlert2: https://sweetalert2.github.io/
Font Awesome: https://fontawesome.com/

Uso

El código proporcionado muestra la implementación de la aplicación de tareas. Se utiliza la API fetch para realizar solicitudes a endpoints específicos y realizar operaciones CRUD en las tareas.

La función obtenerNombreUsuario obtiene el nombre del usuario autenticado haciendo una solicitud GET a la URL urlDatosUsuario. Luego, la función renderizarTareas obtiene las tareas del usuario haciendo una solicitud GET a la URL urlTareas y las muestra en las secciones correspondientes del HTML.

Las funciones botonCambioEstado y eliminarTarea agregan la funcionalidad de cambiar el estado de una tarea (completada o pendiente) y eliminar una tarea respectivamente.

El formulario formCrearTarea permite a los usuarios crear nuevas tareas y el botón btnCerrarSesion permite cerrar sesión en la aplicación.
