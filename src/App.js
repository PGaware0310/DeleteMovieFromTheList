import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryTimer, setRetryTimer] = useState(null);

  const fetchMoviesHandlers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let shouldRetry = true;

    while (shouldRetry) {
      try {
        const response = await fetch(
          "https://react-http-fetchmovie-default-rtdb.firebaseio.com/movies.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong...Retrying");
        }

        const data = await response.json();
        const loadedMovies = [];
        for (const key in data) {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          });
        }
        setMovies(loadedMovies);
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
  }, []);

  useEffect(() => {
    fetchMoviesHandlers();
  }, [fetchMoviesHandlers]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-fetchmovie-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const deleteMovieHandler=(id)=>{
    setMovies((prevMovie)=>prevMovie.filter((movie)=>movie.id!==id));
  }

  const cancelRetryHandler = () => {
    clearTimeout(retryTimer);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandlers}>Fetch Movies</button>
        {isLoading && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}/>}
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
