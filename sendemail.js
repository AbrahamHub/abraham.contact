const formulario = document.getElementById('formulario');
const enviarBtn = document.getElementById('enviar');

formulario.addEventListener('submit', function(e) {
  e.preventDefault(); // previene el envío del formulario

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;

  // Enviar los datos mediante una petición AJAX
  const xhr = new XMLHttpRequest();
  const url = 'https://emailresponceabraham.onrender.com/email';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Datos enviados correctamente');
    }
  };
  const data = JSON.stringify({nombre: nombre, email: email});
  xhr.send(data);
});
