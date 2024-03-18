import { useState } from "react";
import classes from "./AddMovie.module.css";
const AddMovie = () => {
  const [newMovies, setNewMovies] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(newMovies);
    setNewMovies("");
  };
  return (
    <form className={classes.form}>
      <label className={classes.label}>Title</label>
      <br />
      <input
        className={classes.input}
        type="text"
        name="title"
        value={handleChange.title}
        onChange={handleChange}
      />
      <br />
      <label className={classes.label}>Opening Text</label>
      <br />
      <input
        className={classes.input}
        type="text"
        name="openingText"
        rows="4"
        cols="50"
        value={handleChange.description}
        onChange={handleChange}
      />
      <br />
      <label className={classes.label}>Release Date</label>
      <br />
      <input
        className={classes.input}
        type="date"
        name="releaseDate"
        value={handleChange.date}
        onChange={handleChange}
      />
      <br />
      <br />
      <button onClick={onSubmitHandler}>Add Movie</button>
    </form>
  );
};

export default AddMovie;
