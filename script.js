const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const input = document.querySelector(".inputbox");

// Function to show movie details using OMDB API
const getMovieInfo = async (movie) => {
    const myApiKey = "cdc6a378";
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${myApiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "False") {
            showError(data.Error);
        } else {
            showMovieData(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        showError("An error occurred while fetching data.");
    }
};

// Function to display movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    movieContainer.innerHTML = `
        <div class="movie-poster">
            <img src="${Poster !== "N/A" ? Poster : "placeholder.jpg"}" alt="${Title} Poster">
        </div>
        <div class="movie-details">
            <h2 class="movie-title">${Title}</h2>
            <div class="movie-rating">
                <span>⭐ ${imdbRating}</span>
            </div>
            <div class="movie-genres">
                ${Genre.split(",").map(genre => `<span class="genre-tag">${genre.trim()}</span>`).join("")}
            </div>
            <div class="movie-info">
                <p><strong>Released Date:</strong> ${Released}</p>
                <p><strong>Duration:</strong> ${Runtime}</p>
                <p><strong>Cast:</strong> ${Actors}</p>
                <p><strong>Plot:</strong> ${Plot}</p>
            </div>
        </div>
    `;
};

// Function to display error messages
const showError = (message) => {
    movieContainer.innerHTML = `<p class="error-message">${message}</p>`;
};

// Adding event listener to search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = input.value.trim();
    if (movieName !== "") {
        getMovieInfo(movieName);
    } else {
        showError("Please enter a movie name.");
    }
});

// Clear input after search
searchForm.addEventListener("submit", () => {
    input.value = "";
});