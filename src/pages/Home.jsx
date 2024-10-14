import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async (query) => {
    if (!query) {
      setMovies([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=65f25a1c&s=${query}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
      } else {
        setMovies([]);
        console.error(response.data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie data", error);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchMovies(query);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Movie Search App</h1>

      <div className="w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
