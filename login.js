const formularioForm = document.getElementById('Formulario');
const userInput = document.getElementById('inputUser'); 
const passInput = document.getElementById('inputPass'); 
const tablaUsuario = document.getElementById('tablaUser');
const cardProducto = document.getElementById('mostrarElemento');

const json = localStorage.getItem('productos');
let productos = JSON.parse(json) || [];

const admin = {
    username : 'admin', 
    pass: 'admin',
    nombre: 'Admin'
}; 

/*Logueo del admin*/ 
formularioForm.onsubmit = (e) => {
    e.preventDefault(); 
    const coincideUsername = admin.username === userInput.value; 
    const coincidePass =  admin.pass === passInput.value; 
    if (coincideUsername && coincidePass) {
        alert('logueo exitoso');
        window.location.href = './admin.html';
    } else {
        alert('datos incorretos')
    }
} 



function mostrarProducto() {
    const productosMap = productos.map(function (producto) {
        return `
        <div class="col-md-3 col-sm-6">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.detalle}</p>
                </div>
            </div>
        </div> 
        `
    })
    cardProducto.innerHTML = productosMap.join('');
}

mostrarProducto();