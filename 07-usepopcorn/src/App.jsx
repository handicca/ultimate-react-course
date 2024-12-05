/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
import { NavBar } from "./components/NavBar";
import { MoviesList } from "./components/MoviesList";
import { Box } from "./components/Box";
import { MovieDetails, Loader } from "./components/MovieDetails";
import { WatchedSummary, WatchedMoviesList } from "./components/WatchedSummary";
import { ErrorMessage } from "./components/ErrorMessage";

export default function App() {
  const [selecetedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  // const [watched, setWatched] = useState([]);

  // Custom React hook
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  /*
  useEffect(() => {
    console.log("After initial render");
  }, []);

  useEffect(() => {
    console.log("After every render");
  });

  useEffect(() => {
    console.log("D");
  }, [query]);

  console.log("During render");
  */

  function handleSelectMovie(id) {
    setSelectedId((selecetedId) => (id === selecetedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box element={<MoviesList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}

        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selecetedId ? (
            <MovieDetails
              movieId={selecetedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(() => {
  //   function callback(e) {
  //     if (document.activeElement === inputEl.current) return;

  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   document.addEventListener("keydown", callback);
  //   return () => document.removeEventListener("keydown", callback);
  // }, [setQuery]);

  /*
  useEffect(() => {
  const el = document.querySelector(".search");
     console.log(el);
     el.focus();
   }, []);
  */

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
