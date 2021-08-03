const formularioAlta = document.getElementById('formularioAlta');
const nombreInputProducto = document.getElementById('inputNombre');
const empresaInput = document.getElementById('inputEmpresa');
const emailInputProducto = document.getElementById('inputEmail');
const telefonoInput = document.getElementById('inputTel');
const descripcionInput = document.getElementById('inputDescripcion');
const productosTabla = document.getElementById('tabla');

const editarForm = document.getElementById('formularioEditar'); 
const editarNombreInput = document.getElementById('editarNombre');
const editarEmpresaInput = document.getElementById('editarEmpresa');
const editarEmailInput = document.getElementById('editarEmail');
const editarTelefonoInput = document.getElementById('editarTel'); 
const editarDescripcionInput = document.getElementById('editarDescripcion');

const busquedaForm = document.getElementById('formBusqueda');

const json = localStorage.getItem('productos');
let productos = JSON.parse(json) || [];
let productoId = '';


// Funcion generar ID del producto 
function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}; 

// Funcion Alta producto 
const submitAlta = (e) => {
    e.preventDefault(); 
    const producto = {
        id: generarID(),
        nombre: nombreInputProducto.value,
        empresa:empresaInput.value,
        email:emailInputProducto.value,
        telefono:telefonoInput.value,
        detalle:descripcionInput.value,
        registro: Date.now(),
    };
    productos.push(producto);
    const json = JSON.stringify(productos);
    localStorage.setItem('productos',json); 
    mostrarProductos();
    formularioAlta.reset();
};

//Funcion listar productos

function mostrarProductos() {
    const productosMap = productos.map(function (producto) {
        return `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.email}</td>
                <td>${producto.empresa}</td>
                <td>${producto.telefono}</td>
                <td>${producto.detalle}</td>
                <td>
                <button  class="btn btn-success btn-sm p-2">Push Producto</button> 
                <button onclick="mostrarDetalle('${producto.id}')" type="button" class="btn btn-info btn-sm text-white" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver detalle</button>
                <button onclick="cargarModalEditar('${producto.id}')" type="button" class=" text-white btn btn-warning btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalEditar"> Editar </button>
                <button onclick="eliminarProducto('${producto.id}')" class="btn btn-danger btn-sm p-2" >Eliminar producto</button>
                </td>
            </tr>
        `
    })
    productosTabla.innerHTML = productosMap.join('');
}

// funcion para mostrar detalle. 
function mostrarDetalle(id) {
    const productoEncontrado = productos.find((producto) => producto.id === id); 
    const detallesDiv = document.getElementById('detalleProducto');
    const fecha = new Date(productoEncontrado.registro);
    const detallesProducto = `
    <ul>
    <li>Nombre: ${productoEncontrado.nombre}</li>
    <li>empresa: ${productoEncontrado.empresa}</li>
    <li>email: ${productoEncontrado.email}</li>
    <li>telefono: ${productoEncontrado.telefono}</li>
    <li>detalles: ${productoEncontrado.detalle}</li>
    <li>Fecha de registro: ${fecha.toLocaleString()}</li>
    </ul>
    `
    detallesDiv.innerHTML = detallesProducto;
}

// Funcion eliminar Producto. 
function eliminarProducto(id) {
    const confirmar = confirm('Confirmar para eliminar el producto'); 
    if (!confirmar) {
        return
    }
    const productosLocal = JSON.parse(localStorage.getItem('productos')); 
    const productosFiltrados = productosLocal.filter((producto) => producto.id !== id);
    const json = JSON.stringify(productosFiltrados);
    localStorage.setItem('productos',json); 
    productos = productosFiltrados;
    mostrarProductos();
}

// funcion para precargar el modal con los datos previamente ingresado del producto. 
function cargarModalEditar (id) {
    const productoEncontrado = productos.find((producto) => producto.id === id); 
    editarNombreInput.value = productoEncontrado.nombre; 
    editarEmpresaInput.value = productoEncontrado.empresa; 
    editarEmailInput.value = productoEncontrado.email; 
    editarTelefonoInput.value = productoEncontrado.telefono;
    editarDescripcionInput.value = productoEncontrado.detalle;
    productoId = productoEncontrado.id;
}

// funcion para editar el producto. 
function editarProducto(e) {
    e.preventDefault(); 
    const productosModificados = productos.map((producto) => {
        if (producto.id === productoId) {
            const productoModificado = {
                ...producto, 
                nombre: editarNombreInput.value, 
                empresa: editarEmpresaInput.value, 
                email: editarEmailInput.value, 
                telefono: editarTelefonoInput.value, 
                detalle: editarDescripcionInput.value,  
            };
            return productoModificado; 
        } else {
            return producto; 
        }
    })
    const json = JSON.stringify(productosModificados);
    localStorage.setItem('productos', json);
    productos = productosModificados;
    console.log('Se modificó exitosamente un usuario. 👨‍💻');
    mostrarProductos(); 
    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
}

//funcion  busqueda producto 
const submitBusqueda = (e) => {
    e.preventDefault();
    const productosLocal = JSON.parse(localStorage.getItem('productos') || []); 
    const busquedaInput = document.getElementById('busqueda'); 
    const termino = busquedaInput.value.toLowerCase(); 
    const productosFiltrados = productosLocal.filter((producto) => {
        const nombreEnMinuscula = producto.nombre.toLowerCase();
        const empresaEnMinuscula = producto.empresa.toLowerCase();
        const emailEnMinuscula = producto.email.toLowerCase(); 
        const detallesEnMinuscula = producto.detalle.toLowerCase(); 
        return nombreEnMinuscula.includes(termino) || empresaEnMinuscula.includes(termino) || emailEnMinuscula.includes(termino) || detallesEnMinuscula.includes(termino);
    });
        productos = productosFiltrados; 
        mostrarProductos();
}


mostrarProductos();
formularioAlta.onsubmit = submitAlta;
editarForm.onsubmit = editarProducto;
busquedaForm.onsubmit = submitBusqueda;

