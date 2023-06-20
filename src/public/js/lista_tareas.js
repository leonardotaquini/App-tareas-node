const mostrarTareasBtn = document.querySelector('.mostrar_tareas');
const listadoTareas = document.querySelector('.listadoTareas');
//Selecciona los campos de modificar.
const titulo = document.querySelector('#titulo');
const descripcion = document.querySelector('#descripcion');
const idForm = document.querySelector('#id');
const modificarBtn = document.querySelector('.btn-modificar');
//Selecciona los campos de crear.
const inputNombre = document.querySelector('#tarea_nombre');
const inputDescripcion = document.querySelector('#tarea_descripcion');
const agregarTareaBtn = document.querySelector('.agregar_tarea');


//Evento click en listado de tareas.
mostrarTareasBtn.addEventListener('click', async() => {
    const tareas = await obtenerTareas();
    mostrarTareas(tareas);
});

//Evento click en boton modificar.
modificarBtn.addEventListener('click', async() => {

    const tareaModificada = {
        id: id.value,
        descripcion: descripcion.value,
        nombre: titulo.value
    }

    await modificarTarea(tareaModificada);
    Swal.fire({
        icon: 'success',
        title: 'Tarea modificada',
        showConfirmButton: false,
        timer: 1500
    })

})

//Evento click boton agregar

agregarTareaBtn.addEventListener('click', async(e) => {
    
    const tareaNueva = {
        nombre: inputNombre.value,
        descripcion: inputDescripcion.value
    }
    const msg = await agregarTarea(tareaNueva);
    Swal.fire({
        icon: 'success',
        title: 'Tarea agregada',
        showConfirmButton: false,
        timer: 1500,
        text: msg
    });
    resetearForm();
})

//Funciones

const URL_BASE = 'http://localhost:3000/api/tarea/';

const resetearForm = () => {
    inputNombre.value = '';
    inputDescripcion.value = '';
}

const obtenerTareas = async() => {
    const res = await fetch(URL_BASE);
    const data = await res.json();
    return data;
}

const mostrarTareas = (tareas) => {
    listadoTareas.innerHTML = '';
    if(tareas.length === 0){
        listadoTareas.innerHTML += `
            <tr>
                <td colspan="5" class="text-center">No hay tareas registradas</td>
            </tr>
        `;
        return;
    }
    tareas.map((tarea) => {
        listadoTareas.innerHTML += `
            <tr>
                <th>${tarea.id}</th>
                <td>${tarea.nombre}</td>
                <td>${tarea.descripcion}</td>
                <td>
                    <button type="button" onclick="obtenerTarea(${tarea.id})" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-bs-whatever="@mdo">Editar</button>    
                    <button class="btn btn-danger" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
};

const agregarTarea = async(tarea) => {
    try {
        const res = await fetch(`${URL_BASE}save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        });
        const {msg} = await res.json();
        return msg;   
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error creando la tarea.',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

const modificarTarea = async(tarea) => {
    try {
        const res = await fetch(`${URL_BASE}update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error modificando la tarea.',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

const obtenerTarea = async(id) => {
    const tareas = await fetch(`${URL_BASE}${id}`);
    const tarea = await tareas.json();
    idForm.value = tarea.id;
    titulo.value = tarea.nombre;
    descripcion.value = tarea.descripcion;
}

const eliminarTarea = async(id) => {
    try {
        const res = await fetch(`${URL_BASE}delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const {msg} = await res.json();
        const tareas = await obtenerTareas();
        mostrarTareas(tareas);
        Swal.fire({
            icon: 'success',
            title: '¡Exito!',
            text: msg,
            showConfirmButton: false,
            timer: 1500
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ha ocurrido un error eliminando la tarea.',
            showConfirmButton: false,
            timer: 1500
        })
    }

}