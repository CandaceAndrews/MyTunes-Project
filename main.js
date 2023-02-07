fetch("https://itunes.apple.com/search?term=my+chemical+romance&media=music&entity=song&attribute=artistTerm", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        result = trackNamer(data)
    });


function trackNamer(data) {
    // console.log(data.results)
    for (let result of data.results) {
        console.log(result.trackName)
    }
}

