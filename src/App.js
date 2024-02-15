import './App.css';
import {useState,useEffect} from 'react';
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL=' http://www.omdbapi.com/?i=tt3896198&apikey=538184d0';
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(()=>{
    searchMovies("Batman");
  },[]);

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for Movies...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      </div>
  );
}

export default App;
