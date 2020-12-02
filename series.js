const APIURL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=d166e7df81dfc985d206d5c2d017e83a&language=pt-BR&page=2";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=d166e7df81dfc985d206d5c2d017e83a&query=";

const LASTED =    
    "https://api.themoviedb.org/3/discover/movie?sort_by=now_playing.desc&api_key=d166e7df81dfc985d206d5c2d017e83a&language=pt-BR"; 

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// iniciando com os favoritos
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // limpar
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
                <a href="https://www.themoviedb.org/search?language=pt-BR&query=${title}"><img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Sinopse:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
