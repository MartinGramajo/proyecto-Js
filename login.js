const formularioForm = document.getElementById('Formulario');
const userInput = document.getElementById('inputUser'); 
const passInput = document.getElementById('inputPass'); 

const tablaUsuario = document.getElementById('tablaUser');


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



