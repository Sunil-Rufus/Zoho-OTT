iziToast.info({
    title: "to add multiple genres and languages leave a space in between",
    position: "bottomRight"
});

function requestMovie()
{
    let movies = getMovieFromLocalStorage("some error")
    let movieName = document.getElementById("requestMovieName").value;
    let movieGenre = document.getElementById("requestGenre").value.split(" ");
    let movieLang = document.getElementById("requestLang").value.split(" ");
    let movieDesc = document.getElementById("requestDesc").value;
    let movieImg = document.getElementById("imageUrl").value;
    let movieRating = document.getElementById("requestrate").value;
    let movieTime = document.getElementById("requestMovieTime").value;
    movieTime = toTimestamp(movieTime);

    movies.push({
        id:movies.length+1,
        movie:movieName,
        genre:movieGenre,
        language:movieLang,
        description:movieDesc,
        url:movieImg,
        rating:parseInt(movieRating),
        viewCount:1,
        date:movieTime
    })
console.log(movies)
    localStorage.setItem("movies",JSON.stringify(movies));
}

flatpickr("#requestMovieTime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}
