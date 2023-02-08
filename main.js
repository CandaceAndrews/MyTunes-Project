// Variable--Contained elements from HTML---Contained URL parts
const form = document.querySelector("#search-form");
const baseUrl = "https://proxy-itunes-api.glitch.me/search?term=";
const endUrl = "&media=music&entity=song&attribute=artistTerm";
const container = document.querySelector("#musicContainer");
const musicPlayer = document.querySelector("#audio-player");

// Event---Listen for search being submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let term = document.querySelector("#search-text").value;
    console.log(`Search term: ${term}`);
    search(term);
});

// Function---Gather results from API---Run buildResultHtml function
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
            container.innerHTML = '';
            buildResultsHtml(resultData.results);
        });
}

// Function---What to display from API results
function buildResultsHtml(resultArray) {

    // Check if input from user is in the API results
    if (resultArray.length === 0) {
        let noResults = document.createElement("p");
        noResults.classList.add("no-results");
        noResults.innerText = "No results found";
        container.appendChild(noResults);
        return;

    } else {

        for (let spot of resultArray) {
            // div for all song content
            let songDiv = document.createElement("div")
            songDiv.classList.add("songDiv");

            // Track Name---
            let trackTitle = document.createElement("p");
            trackTitle.classList.add("track-name");
            trackTitle.innerText = `Track: ${spot.trackName}`;

            // Click-Event for each demo button
            trackTitle.addEventListener('click', function (event) {
                let demo = spot.previewUrl;
                musicPlayer.src = demo;
            })

            // Artist Name---
            let artistName = document.createElement("p")
            artistName.classList.add("artist-name")
            artistName.innerText = spot.artistName;

            // Album Title---
            let albumTitle = document.createElement("p")
            albumTitle.classList.add("album-title");
            albumTitle.innerText = `Album: ${spot.collectionName}`;

            // Album Art---
            let coverThumbnail = document.createElement("img")
            coverThumbnail.classList.add("cover-art");
            coverThumbnail.src = spot.artworkUrl100;

            // Append to container---
            songDiv.appendChild(trackTitle);
            songDiv.appendChild(artistName);
            songDiv.appendChild(albumTitle);
            songDiv.appendChild(coverThumbnail);
            container.appendChild(songDiv);
        }
    }
}
