const formularioAlta = document.getElementById('formularioAlta');
const nombreInputProducto = document.getElementById('inputNombre');
const empresaInput = document.getElementById('inputEmpresa');
const emailInputProducto = document.getElementById('inputEmail');
const telefonoInput = document.getElementById('inputTel');
const descripcionInput = document.getElementById('inputDescripcion');
const productosTabla = document.getElementById('tabla');

const json = localStorage.getItem('productos');
let productos = JSON.parse(json) || [];
let productoID = '';


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
                <button type="button" class="btn btn-success btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalEditar"> Editar </button>
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





mostrarProductos();

formularioAlta.onsubmit = submitAlta;