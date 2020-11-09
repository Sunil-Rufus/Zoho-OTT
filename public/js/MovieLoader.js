function callHTML(){
  let movie_collection = getMovieFromLocalStorage();
  movie_collection.forEach(function(movie){
    loadMoviesInCard(movie)
  })
}
function loadMoviesInCard(movie)
{
    const parent = document.getElementById("cards");

        let card =document.createElement("div");
        card.setAttribute("onclick", "navigate()");
        let img = document.createElement("img");
        img.src = movie.url;
        let card_im = document.createAttribute("class");
        card_im.value = "card-img-top card_img"
        img.setAttributeNode(card_im)
        let att = document.createAttribute("class");
        att.value = "col-3 p-0 mr-4 bg-dark movie-scroll-box  card";
        card.setAttributeNode(att);
        card.appendChild(img);
        parent.appendChild(card);

}
function navigate(){window.location.href = "./index.html"}
