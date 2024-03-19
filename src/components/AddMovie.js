import { useRef } from "react";
import classes from "./AddMovie.module.css";
const AddMovie = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    //Validations

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovie(movie);
  };
  
  return (
    <form onSubmit={onSubmitHandler}>
      <div className={classes.form}>
        <label>Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.form}>
        <label>Opening Text</label>
        <textarea
          id="openingText"
          rows="4"
          cols="50"
          ref={openingTextRef}
        ></textarea>
      </div>
      <div className={classes.form}>
        <label>Release Date</label>
        <input
          className={classes.input}
          type="date"
          id="releaseDate"
          ref={releaseDateRef}
        />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
