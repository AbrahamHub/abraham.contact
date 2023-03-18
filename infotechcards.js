function fetchData () {
    var data = [
    {"img":"static/tech-icons/html.png","alt":"HTML","name":"HTML 5",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/html.png","alt":"CSS","name":"CSS 3",
    "p":"Si le se al cssssss lorem","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/html.png","alt":"HTML","name":"HTML 5",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/html.png","alt":"CSS","name":"CSS 3",
    "p":"Si le se al cssssss lorem","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/html.png","alt":"HTML","name":"HTML 5",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/html.png","alt":"CSS","name":"CSS 3",
    "p":"Si le se al cssssss lorem","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/html.png","alt":"HTML","name":"HTML 5",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/html.png","alt":"CSS","name":"CSS 3",
    "p":"Si le se al cssssss lorem","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/html.png","alt":"HTML","name":"HTML 5",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/html.png","alt":"CSS","name":"CSS 3",
    "p":"Si le se al cssssss lorem","star":"static/tech-icons/trans.png"},
    ]
      // Crear un elemento para cada propiedad
      Object.keys(data).forEach(key => {
        const value = data[key];
        const element = document.getElementById("Cards");
        const HTML = `<div class="card">
        <div class="align">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span></div>                       
        <img src="${value.img}" alt="${value.alt}">${value.name}
        <p>
        ${value.p}
        <img src="${value.star}" alt="star"></p></div>`;
        element.insertAdjacentHTML("beforeend", HTML)
      })
    }
fetchData()