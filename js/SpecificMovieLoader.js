// working on being able to add any number of stars.
let currentRating = 0;
let jqueryElm = $("#parent1");
let starCount = 5;
let starValue = Math.floor(100 / starCount);
let MOVIES;
let watchNowFlag = false;
jqueryElm.click(function(e) {
    let x = e.pageX - this.offsetLeft;
    let total = (x/jqueryElm.width())*100;
    rateStyleJQ(Math.floor(total), jqueryElm);
    setMovieRating(currentRating/20);
});
let movieID;

jqueryElm.mousemove(function(e) {
    let x = e.pageX - this.offsetLeft;
    let total = (x/jqueryElm.width())*100;
    rateStyleHover(Math.floor(total), jqueryElm);
});
// to clear hover effect when mouse leaves div
jqueryElm.mouseout(function() {
    $(".star").removeClass("star-hover");
    // show original rating after hover if unclicked
    rateStyleJQ(currentRating, jqueryElm);
});

function rateStyleJQ(num, jqueryElmX) {
    let starOvers = jqueryElmX.find(".star-over");
    starOvers.removeClass("star-visible").css("width","");
    let ratingRounded = (Math.floor(num)/starValue);
    let leftOver = (Math.floor(num) % starValue)*starCount;
    starOvers.slice(0, ratingRounded).addClass("star-visible");
    if (leftOver !== 0) {
        $(starOvers[Math.floor(ratingRounded)]).addClass('star-visible').css("width",leftOver+"%");
    }
    currentRating = num;

}

function rateStyleHover(num, jqueryElmX) {
    let starOvers = jqueryElmX.find(".star-over");
    starOvers.removeClass("star-hover").removeClass("star-visible").css("width","");
    let ratingRounded = (Math.floor(num)/starValue);
    let leftOver = (Math.floor(num) % starValue)*starCount;
    starOvers.slice(0, ratingRounded).addClass("star-hover");
    if (leftOver !== 0) {
        $(starOvers[Math.floor(ratingRounded)]).addClass('star-hover').css("width",leftOver+"%");
    }
}

function loadCurrentMovie()
{
    movieID = getParams(window.location.href);
    console.log(movieID);
    MOVIES = getMovieFromLocalStorage("loaded a hardcoded movie");
    let flag =0;
    MOVIES.forEach(function (movie)
    {
        if(movie.id == movieID.id)
        {
            console.log(movie)
           let movieImage = document.getElementById("movieImage");
           movieImage.setAttribute("src",movie.url);
           document.getElementById("movieName").innerHTML = movie.movie;

            let ratingStar = document.createElement("span")
            ratingStar.className = "fa fa-star text-primary fa-xs";
            let ratingHolder = document.getElementById("movieRating");
            for (let i = 0; i < 5; i++) {
                i < movie.rating ? ratingStar.className = "fa fa-star text-warning fa-xs" : ratingStar.className = "fa fa-star fa-xs"
                ratingHolder.appendChild(ratingStar.cloneNode(true));
            }

            let genre = document.getElementById("movieGenre");
            let genreString = genre.innerHTML;
            for(let i=0;i<movie.genre.length;i++)
            {
                genreString = genreString + movie.genre[i] + ", ";
            }
            genre.innerHTML = genreString;

            let lang = document.getElementById("movieLang");
            let langString = lang.innerHTML;
            for(let i=0;i<movie.language.length;i++)
            {
                langString = langString + movie.language[i] + ", ";
            }
            lang.innerHTML = langString;

            document.getElementById("gist").innerHTML = movie.description;
            flag = 1;
        }
    });
    if(flag == 0)
    {
        iziToast.error({
            message: "No such movie exists in our collections",
            position: "bottomRight"
        })
    }
}

function watchNow()
{
    watchNowFlag = true
}

function setMovieRating(rate)
{
    if(watchNowFlag == false)
    {
        iziToast.error({
            message: "cant rate now! first watch the movie. click watch now to watch!",
            position: "bottomRight"
        })
    }
    else
    {
        iziToast.success({
            message: "u gave " +rate+ " stars to this movie",
            position: "bottomRight"
        })
        MOVIES.forEach(function (movie) {
            if (movie.id == movieID.id) {
                MOVIES.splice(movie.id-1, 1);
                movie.rating = ((movie.rating * movie.viewCount) + rate )/(movie.viewCount+1);
                movie.viewCount = movie.viewCount+1;
                MOVIES.push(movie);
                return false;
            }
        });
        localStorage.setItem("movies",JSON.stringify(MOVIES))
    }
    watchNowFlag = false;
}

function getParams(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
