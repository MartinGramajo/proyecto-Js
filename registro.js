const registroFormUsuario = document.getElementById('formularioRegistroAlta');
const inputNombreUsuario = document.getElementById('inputNombreRegistro'); 
const inputEmailUsuario = document.getElementById('inputEmailRegistro'); 
const inputContraseñaUsuario = document.getElementById('inputContraRegistro');
const inputConfirmarContraseña = document.getElementById('inputConfirmarContraseña'); 
const usuariosTable = document.getElementById('tablaUser'); 

const json = localStorage.getItem('usuarios');
let usuarios = JSON.parse(json) ||  []; 

function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}; 

function submitFormulario(e) {
    e.preventDefault(); 
    const usuario = {
        id: generarID(), 
        nombre: inputNombreUsuario.value,
        email: inputEmailUsuario.value, 
        contraseña: inputContraseñaUsuario.value, 
        confirmarContraseña: inputConfirmarContraseña, 
    };
    usuarios.push(usuario); 
    const json = JSON.stringify(usuarios); 
    localStorage.setItem('usuarios', json); 
    mostrarUsuarios(); 
    registroFormUsuario.reset(); 
}

function mostrarUsuarios() {
    const usuariosMap = usuarios.map(function(usuario) {
        return `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.contraseña}</td>
            </tr> 
        `; 
    })
    usuariosTable.innerHTML = usuariosMap.join('')
}