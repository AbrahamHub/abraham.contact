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
         `<div class="user">
         <img src=${value.image} alt="repo img">
         <a href=${value.link} target="_blank" rel="noopener noreferrer"><h3>${value.repo}</h3></a>
        </div>`   
        document.getElementById("proyect").insertAdjacentHTML("afterbegin", html)  
    }).join("")
    
    })

}
fetchData()