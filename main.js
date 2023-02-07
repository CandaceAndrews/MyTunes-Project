//Variable--Contained elements from HTML---Contained URL parts
const form = document.querySelector("#search-form");
const baseUrl = "https://proxy-itunes-api.glitch.me/search?term=";
const endUrl = "&media=music&entity=song&attribute=artistTerm";
const container = document.querySelector("#musicContainer");


//Event---Listen for search being submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let term = document.querySelector("#search-text").value;
    console.log(`Search term: ${term}`);
    search(term);
});

//Function---Gather results from API---Run buildResultHtml function
function search(searchTerm) {
    let searchUrl = `${baseUrl}${searchTerm}${endUrl}`;
    console.log(searchUrl);
    fetch(searchUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (resultData) {
            buildResultsHtml(resultData.results);
        });
}

//Function---Takes results and makes div for each trackName
function buildResultsHtml(resultArray) {
    for (let spot of resultArray) {
        //Track Name---
        let songDiv = document.createElement("div")
        let title = document.createElement("h2");
        title.innerText = spot.trackName;

        //Artist Name---
        let artistName = document.createElement('h1')
        artistName.innerText = spot.artistName;

        //Album Art
        let coverDiv = document.createElement("img")
        coverDiv.src = spot.artworkUrl100;

        //Append to container---
        songDiv.appendChild(artistName);
        songDiv.appendChild(title);
        songDiv.appendChild(coverDiv);
        container.appendChild(songDiv);

    }
}