import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const onDeleteHandler = async () => {
    try {
      const response = await fetch(
        `https://react-http-fetchmovie-default-rtdb.firebaseio.com/movies/${props.id}.json`,{
          method:'DELETE'
        });
      if(!response.ok){
throw new Error("Failed to delete movie");
      }
      //Update the UI by removing movie from the list
      props.onDelete(props.id);
    } catch (error) {
      console.error("Error Deleting Movie", error.message);
    }
  };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={onDeleteHandler}>Delete Movie</button>
    </li>
  );
};

export default Movie;
