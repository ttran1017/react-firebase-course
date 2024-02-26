import React, { useState, useEffect } from "react";
import { db, auth } from "../config/Firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function Movies() {
  const [movieList, setMovieList] = useState([]);

  // New Movie State
  const [newMovie, setNewMovie] = useState({ receivedAnOscar: false });
  console.log(newMovie);

  // Update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        ...newMovie,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Movie title..."
          onChange={(event) => {
            setNewMovie({ ...newMovie, title: event.target.value });
          }}
        />
        <input
          placeholder="Release date..."
          type="number"
          onChange={(event) => {
            setNewMovie({
              ...newMovie,
              releaseDate: Number(event.target.value),
            });
          }}
        />
        <input
          type="checkbox"
          checked={newMovie.receivedAnOscar}
          onChange={(event) => {
            setNewMovie({ ...newMovie, receivedAnOscar: event.target.checked });
          }}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit a movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.title}>
            <h1>{movie.title}</h1>
            <h3>Release date {movie.releaseDate}</h3>
            {movie.receivedAnOscar ? <h3>Received oscar</h3> : null}
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="New title..."
              onChange={(event) => {
                setUpdatedTitle(event.target.value);
              }}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
