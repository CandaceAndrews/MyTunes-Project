//Variable--Contained elements from HTML
const form = document.querySelector("#search-form");
const baseUrl = "https://proxy-itunes-api.glitch.me/search?term=";
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
    let searchUrl = `${baseUrl}${searchTerm}`;
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
        let musicDiv = document.createElement("div");
        let titleEl = document.createElement("h2");
        titleEl.innerText = spot.trackName;
        musicDiv.appendChild(titleEl);
        container.appendChild(musicDiv);
    }
}