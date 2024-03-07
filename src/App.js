import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState(null);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    let shouldRetry = true;

    while (shouldRetry) {
      try {
        const response = await fetch("https://swapi.dev/api/film/");
        if (!response.ok) {
          throw new Error("Something went wrong...Retrying");
        }

        const data = await response.json();

        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        shouldRetry = false;
      } catch (error) {
        setError(error.message);
        // Retry after 5 seconds
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, 5000);
          console.log("Retry calling the Api:", timer);
          setRetryTimer(timer);
        });
      }
    }

    setIsLoading(false);
  };

  const cancelRetryHandler = () => {
    clearTimeout(retryTimer);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {isLoading && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length === 0 && !error && (
          <p>Movies not Found.</p>
        )}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
