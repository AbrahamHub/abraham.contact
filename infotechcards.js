function fetchData () {
    fetch("https://gh-pinned-repos.egoist.dev/?username=abrahamhub").then(response => {
        if (!response.ok) {
            throw Error("ERROR")
        }
        return response.json()
    }).then(data => {
        Object.keys(data).map(key => {
        const value = data[key]
        const html = 
     `
     <div class="card">
        <div class="align">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span></div>                       
        <img src="static/tech-icons/html.png" alt="HTML">HTML 5
        <p>
        <img src="static/tech-icons/stars.png" alt="star"></p></div>`   
    document.getElementById("cards").insertAdjacentHTML("afterbegin", html) 
    }).join("")
    })
}
fetchData()