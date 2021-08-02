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
        detalle:descripcionInput.value
    };
    console.log("file: admin.js ~ line 29 ~ submitAlta ~ producto ", producto )
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
                <button  class="btn btn-primary btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalDetalle">Push Producto</button> 
                <button onclick="cargarModalEditar('${producto.id}')" type="button" class="btn btn-success btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalEditar"> Editar </button>
                <button onclick="eliminarProducto('${producto.id}')" class="btn btn-danger btn-sm p-2" >Eliminar producto</button>
                </td>
            </tr>
        `
    })
    productosTabla.innerHTML = productosMap.join('');
}

// Funcion eliminar Producto 
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

function cargarModalEditar (id) {
    const productoEncontrado = productos.find((producto) => producto.id === id); 
    editarNombreInput.value = productoEncontrado.nombre; 
    editarEmpresaInput.value = productoEncontrado.empresa; 
    editarEmailInput.value = productoEncontrado.email; 
    editarTelefonoInput.value = productoEncontrado.telefono;
    editarDescripcionInput.value = productoEncontrado.detalle;
    productoId = productoEncontrado.id;
}

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

mostrarProductos();
formularioAlta.onsubmit = submitAlta;
editarForm.onsubmit = editarProducto;

