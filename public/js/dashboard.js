let genres = []
let lang = []
let movies;


function checkAdmin()
{
    if(checkUser() == 2)
    {
        let parent = document.getElementById("adminList");
        let admin = document.createElement("li");
        admin.className = "nav-item";
        let a = document.createElement("a");
        a.className = "nav-link middle";
        a.setAttribute("href","./admin.html");
        a.innerHTML = "admin";
        admin.appendChild(a);
        parent.appendChild(admin);
    }
}

function loadMovieJS() {
    checkAdmin();
    let user = JSON.parse(localStorage.getItem("current_user"));
    console.log(user)
    iziToast.info({
        title: "welcome " + user.userName,
        position: "bottomRight"
    });
    movies = getMovieFromLocalStorage("no movies loaded! showing some default hard coded movies we have");
    setGenres()
    setLanguage()
    movieLoader()
}

function createTemplate(data) {
    return `
    <div class="custom-control custom-checkbox ml-2 pb-2">
        <input type="checkbox" class="custom-control-input filled-in" id="${data.toLowerCase()}">
            <label
                class="custom-control-label small w-100 text-uppercase card-link-secondary px-2 py-1"
                for="${data.toLowerCase()}">${data}
            </label>
    </div>
            `
}

function setLanguage() {
    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].language.length; j++) {
            lang.push(movies[i].language[j].toLowerCase())
        }
    }
    lang = [...new Set(lang)];
    console.log(lang);
    renderLanguage(lang)
}

function setGenres() {
    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].genre.length; j++) {
            genres.push(movies[i].genre[j].toLowerCase())
        }
    }
    genres = [...new Set(genres)];
    console.log(genres);
    renderGenre(genres)
}

function renderLanguage(genres) {
    const template =
        genres.length === 0 ? `
    <p class="mx-auto">No matching results found.</p>
    ` : genres.map((product) => createTemplate(product)).join("\n");
    $("#languageFilter").html("<p>Language</p>" + template);

}

function renderGenre(genres) {
    const template =
        genres.length === 0 ? `
    <p class="mx-auto">No matching results found.</p>
    ` : genres.map((product) => createTemplate(product)).join("\n");
    $("#genreFilter").html("<p>Genres</p>" + template);

}

function movieLoader() {
    console.log(movies)

    if (movies.empty) {
        $("#movieLoader").hide()
        if ($("#noData").length == 0)
            $("#movieCards").append("<p class=\"mx-auto my-5\" id=\"noData\">No data found</p>")
    }
    deleteAllCards();
    sortElements(movies);
}


function loadMovieInNewCard(movie, ids) {
    $("#movieLoader").hide();
    const cardParent = document.getElementById(ids)
    let carddiv = document.createElement("div");
    carddiv.className = " col-12 col-md-3 px-3 py-2"
    let card = document.createElement("div");
    card.className = "card";
    card.id = ids + "CARD" + movie.id;
    card.setAttribute("onclick","loadSpecificMovie(this)");
    let image = document.createElement("img");
    image.src = movie.url;
    image.className = "card-img-top";



    let movieNames = document.createElement("h5");
    movieNames.id = ids + "NAMES" + movie.id;
    movieNames.className = "text-upper";
    movieNames.innerText = movie.movie;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body bg-dark rounded-lg p-2";

    let ratingStar = document.createElement("span")
    ratingStar.className = "fa fa-star text-primary fa-xs"


    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(movieNames);
    for (let i = 0; i < 5; i++) {
        i < movie.rating ? ratingStar.className = "fa fa-star text-warning fa-xs" : ratingStar.className = "fa fa-star fa-xs"
        cardBody.appendChild(ratingStar.cloneNode(true));
    }


    carddiv.appendChild(card);
    cardParent.appendChild(carddiv);
}


function formatResponse(res) {
    const ta = Object.keys(res).map(key => ({
        ...res[key],
        ID: key
    }));
    return ta;
}

function loadSpecificMovie(movieRef) {
    let movieID = movieRef.id;
    movieID.split("CARD")[1] != undefined ? movieID = movieID.split("CARD")[1] : movieID = movieID
    window.location.assign("./movie.html?id=" + movieID);
}



function gatherFilterElements() {

    let filterList = [];
    let x;

    genres.forEach(element => {
        x = document.getElementById(element.toLowerCase()).checked ? filterList.push(element.toLowerCase()) : '';
    });

    lang.forEach(element => {
        x = document.getElementById(element.toLowerCase()).checked ? filterList.push(element.toLowerCase()) : '';
    });

    console.log(filterList)

    applyFilter(filterList)
}

function applyFilter(filterIDs) {
    if (filterIDs.length != 0) {
        let movieList = [];
        for (let i = 0; i < filterIDs.length; i++) {

            genres.forEach(element => {
                if (filterIDs[i] == element.toLowerCase()) {
                    movieList = movieList.concat(getRequiredList("genre", element));
                }

            });

            lang.forEach(element => {
                if (filterIDs[i] == element.toLowerCase()) {
                    movieList = movieList.concat(getRequiredList("lang", element));
                }

            });

        }
        let reqList = [...new Set(movieList)];
        console.log(reqList)
        deleteAllCards();
        $("#movieLoader").show()
        let filteredMovies = [];
        if (reqList.length != 0) {
            for (let i = 0; i < reqList.length; i++) {
                console.log(reqList[i])
                movies.forEach(function (movie) {
                    if (reqList[i] == movie.id) {
                        console.log("founddddd" + movie)
                        filteredMovies.push(movie);
                        return false;
                    }
                });
            }
            sortElements(filteredMovies)
        } else {
            $("#Loader").hide()
            if ($("#noData").length == 0)
                $("#movieCards").append("<p class=\"mx-auto my-5\" id=\"noData\">No data found</p>")
        }
    } else {
        // if no filters are selected
        if ($("#noData").length != 0) {
            $("#noData").remove()
        }

        movieLoader()
    }
}


function getRequiredList(filterType, filterID) {

    let reqList = [];

    switch (filterType) {
        case "genre":
            movies.forEach(function (movie) {
                let movieGenreList = movie.genre;
                for (let j = 0; j < movieGenreList.length; j++) {
                    if (movieGenreList[j] == filterID) {
                        reqList.push(movie.id);
                        break;
                    }
                }
            });
            break;
        case "lang":
            movies.forEach(function (movie) {
                let movieLanguageList = movie.language;
                for (let j = 0; j < movieLanguageList.length; j++) {
                    if (movieLanguageList[j] == filterID) {
                        reqList.push(movie.id);
                        break;
                    }
                }
            });
            break;

    }
    console.log(reqList)
    return reqList;
}

function deleteAllCards() {
    document.getElementById("movieCards").remove();
    let newParent = document.createElement("div");
    newParent.className = "d-flex justify-content-evenly flex-wrap col-12 p-0"
    newParent.id = "movieCards";
    document.getElementById("movieBody").appendChild(newParent);
}

function sortElements(sortMovies) {
    let rate = document.getElementById("rating").checked;
    let time = document.getElementById("time").checked;
    console.log(rate)
    console.log(time)

    if (rate == true) {
        sortMovies.sort(dynamicSort("-rating"))
    } else if (time == true) {
        sortMovies.sort(dynamicSort("-date"))
    } else if (rate == true && time == true) {
        sortMovies.sort(dynamicSortMultiple("-rating", "-date"))
    }

    sortMovies.forEach(function (movie) {
        loadMovieInNewCard(movie, "movieCards")
    })
}

function dynamicSort(property) {
    console.log("i")
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {

        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple() {

    var props = arguments;
    return function (obj1, obj2) {
        var i = 0,
            result = 0,
            numberOfProperties = props.length;

        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}
