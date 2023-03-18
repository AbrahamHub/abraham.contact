const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar que el formulario se envíe por defecto

  const name = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;

  // Crear objeto con los datos del formulario
  const datosFormulario = {
    name: name,
    email: email
  };

  // Enviar los datos por fetch POST
  fetch("https://emailresponceabraham.onrender.com/email", {
    method: "POST",
    body: JSON.stringify(datosFormulario),
    headers: { 
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
});
