const formularioForm = document.getElementById('Formulario');
const userInput = document.getElementById('inputUser'); 
const passInput = document.getElementById('inputPass'); 

const admin = {
    username : 'admin@admin', 
    pass: 'admin',
    nombre: 'Admin'
}; 

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