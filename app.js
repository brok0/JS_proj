const searchButton = document.getElementById("search");
const InputElement = document.getElementById("inputValue");
const movieSearchable = document.querySelector("#movieSearchable");

//InputElement.value = "spiderman";

function resetInput() {
  InputElement.value = "";
}
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=b408bdc129cbcf02dfe13063da8da46f";
const imageUrl = "https://image.tmdb.org/t/p/w500";

function renderSearchMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
  console.log(data);
}

function search() {
  // event.preventDefault();
  for (let a of movieSearchable.childNodes) {
    movieSearchable.removeChild(a);
  }
  var value;
  if (InputElement !== "") {
    value = InputElement.value;
    var newUrl;
  }
  if (value === "") {
    newUrl = trandingUrl;
  } else {
    newUrl = url + "&query=" + value;
  }
  fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      renderSearchMovies(data);
    })
    .catch(error => {
      console.log(error);
    });
  console.log(value);
  resetInput();
}

searchButton.onclick = search;

function movieSection(movies) {
  return movies.map(movie => {
    if (movie.poster_path) {
      return ` <li > 
      <img src =${imageUrl + movie.poster_path} id = ${
        movie.id
      } height = 150px /> 

    <p>-${movie.original_title}</p> 
    </li>
    `;
    }
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");
  const movieTemplate = `
  <section class = "section">
    ${movieSection(movies)}
  </section>
  <div class = "content">
  <p id = "content-close>X</p>
  </div>

  `;
  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

const trandingUrl =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=b408bdc129cbcf02dfe13063da8da46f";

document.onclick = function(event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    //тут вибирається таргет потрібно вивантажити сторінку з картинкою,назвою і описом вибраного фільму + кілька рекомендацій
    for (let a of movieSearchable.childNodes) {
      movieSearchable.removeChild(a);
    }
    console.log("Event: ", event);

    const movieId = target.id;

    //content.classList.add("content-display");
    console.log("targeted");

    Show_movie(movieId);
    // var x = document.getElementById().textContent;
    console.log(movieId);
  }
};

////main page

fetch(trandingUrl)
  .then(res => res.json())
  .then(data => {
    renderSearchMovies(data);
  });
function Get(Url) {
  let Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", Url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function Show_movie(movieId) {
  for (let a of movieSearchable.childNodes) {
    movieSearchable.removeChild(a);
  }
  let NewnewUrl =
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "?api_key=b408bdc129cbcf02dfe13063da8da46f";
  let json = JSON.parse(Get(NewnewUrl));

  let img = document.createElement("img");

  img.src = "https://image.tmdb.org/t/p/w500" + json.poster_path;
  movieSearchable.appendChild(img);
  let title = document.createElement("h1");
  title.innerHTML = json.original_title;
  movieSearchable.appendChild(title);
  let description = document.createTextNode(json.overview);
  movieSearchable.appendChild(description);
  let recomendations = document.createElement("h2");
  recomendations.innerHTML = "Recommendations";
  movieSearchable.appendChild(recomendations);
  let recomendUrl =
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "/recommendations" +
    "?api_key=b408bdc129cbcf02dfe13063da8da46f";
  let json1 = JSON.parse(Get(recomendUrl));
  console.log(json1);
  var title1 = json1.results[0].title;
  var title2 = json1.results[1].title;
  var title3 = json1.results[2].title;
  const g = `
     <li>
     <p> ${title1} </p>
     <p> ${title2} </p>
     <p> ${title3} </p>


     </li>
     `;
  recomendations.innerHTML += g;
  //movieSearchable.appendChild(movieBlock);
}
