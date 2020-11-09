
function checkUser()
{
    let currentUser = JSON.parse(localStorage.getItem("current_user"));
    if(currentUser == undefined)
    {
        return 0;
    }
    else if(currentUser.email == "admin@gmail.com")
    {
        return 2;
    }
    else
    {
        return 1;
    }
}

function logout()
{
    localStorage.removeItem("current_user");
    window.location.assign("./register.html");
}

function getMovieFromLocalStorage(msg) {
    let moviesInLocalStorage = JSON.parse(localStorage.getItem("movies"));
    if (moviesInLocalStorage == undefined) {
        iziToast.warning({
            message: msg,
            position: "bottomRight"
        })
        moviesInLocalStorage = JSON.parse("[{\r\n  \"id\":1,\r\n  \"movie\" : \"Anniyan\",\r\n  \"url\" : \"https:\/\/in.bmscdn.com\/iedb\/movies\/images\/mobile\/thumbnail\/large\/anniyan-et00002333-24-03-2017-16-17-18.jpg\",\r\n  \"genre\" : [\"suspense\", \"thriller\"],\r\n  \"rating\" : 4,\r\n  \"language\" :[\"tamil\",\"telugu\"],\r\n  \"date\" : 1604900114,\r\n  \"viewCount\":1\r\n},\r\n{\r\n  \"id\":2,\r\n  \"movie\" : \"IronMan\",\r\n  \"url\" : \"https:\/\/venturebeat.com\/wp-content\/uploads\/2018\/09\/ironman.jpg?w=1200&strip=all\",\r\n  \"genre\" : [\"science-fiction\",\"superhero\",\"action\"],\r\n  \"rating\" : 4,\r\n  \"language\" : [\"tamil\",\"english\"],\r\n  \"date\" : 160492318,\r\n  \"viewCount\":1\r\n}]\r\n)
    }
    return moviesInLocalStorage
}
