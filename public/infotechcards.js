function fetchData () {
    var data = [
    {"img":"static/tech-icons/html.png","alt":"HTML","name":"HTML 5",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/css.png","alt":"CSS","name":"CSS 3",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/js.png","alt":"JS","name":"JavaScript",
    "p":"En constante práctica","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/react.png","alt":"ReactJS","name":"ReactJS",
    "p":"Me apasiona y me gusta","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/git.png","alt":"git","name":"GIT",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/github.png","alt":"github","name":"Git Hub",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/bash.png","alt":"bash","name":"Bash & DockFiles",
    "p":"Tuneado mi terminal","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/ssh.png","alt":"SSH","name":"SSH",
    "p":"Seguridad ante todo","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/tail.png","alt":"Tailwind","name":"Tailwind CSS",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/boots.png","alt":"Bootstrap","name":"Bootstrap",
    "p":"Un clásico","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/figma.png","alt":"figma","name":"Figma",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/mat.png","alt":"material","name":" Material IU",
    "p":"Lindo y rápido","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/mysql.png","alt":"mysql","name":"  MySQL",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/postgresql.png","alt":"postgresql","name":"PostgreSQL",
    "p":"Confiable","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/mongodb.png","alt":"mongodb","name":"MongoDB",
    "p":"Aprendiendo","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/graphql.png","alt":"graphql","name":" GraphQL",
    "p":"Muy novedoso","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/node.png","alt":"node","name":"  Node JS",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/deno.png","alt":"deno","name":"Deno",
    "p":"Descubriendo","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/vite.png","alt":"vite","name":"Vite JS",
    "p":"Utilizando más seguido","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/next.png","alt":"next","name":" Next JS",
    "p":"SPA una locura","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/java.png","alt":"java","name":"JAVA",
    "p":"Mi lenguaje Favorito","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/spring.png","alt":"spring","name":" Spring Boot",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/kotlin.png","alt":"kotlin","name":"Kotlin",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/jakarta.png","alt":"jakarta","name":"Jakarta EE",
    "p":"<br>Muy potente","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/docker.png","alt":"docker","name":"Docker",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/kubernetes.png","alt":"kubernetes","name":"Kubernetes",
    "p":"Desplegando","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/azure.png","alt":"azure","name":"Azure",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/aws.png","alt":"aws","name":" AWS",
    "p":"Deploys","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/travis.png","alt":"travis","name":"Travis CI",
    "p":"Aprendiendo","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/actions.png","alt":"actions","name":"GH Actions",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/fire.png","alt":"firebase","name":"Firebase",
    "p":"Agilidad al desarrollo","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/space.png","alt":"space","name":"Space JB",
    "p":"Muy bueno para organizar","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/windows.png","alt":"windows","name":" Windows",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/mac.png","alt":"mac os","name":"Mac OS",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/linux.png","alt":"linux","name":"Linux",
    "p":"Soy muy bueno en linux","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/open.png","alt":"open","name":"Open Source",
    "p":"Open Source Lover ❤️","star":"static/tech-icons/trans.png"},

    {"img":"static/tech-icons/ios.png","alt":"iOS","name":"iOS Dev",
    "p":"Aprendiendo iOS","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/android.png","alt":"android","name":"Android Dev",
    "p":"","star":"static/tech-icons/stars.png"},
    {"img":"static/tech-icons/ddd.png","alt":"ddd","name":" DDD",
    "p":"Arquitecturas limpias","star":"static/tech-icons/trans.png"},
    {"img":"static/tech-icons/solid.png","alt":"solid","name":"SOLID",
    "p":"<br>Software de calidad","star":"static/tech-icons/trans.png"},
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