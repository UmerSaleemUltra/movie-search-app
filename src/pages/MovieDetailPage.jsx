import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=65f25a1c&i=${id}`
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          console.error(response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-800">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-center text-gray-800">Movie not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        Back to Search
      </Link>
      <h1 className="text-3xl font-bold text-gray-800">{movie.Title}</h1>
      <p className="text-gray-600">{movie.Year}</p>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-96 object-cover my-4"
      />
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Plot</h2>
        <p className="text-gray-700">{movie.Plot}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Cast</h2>
        <p className="text-gray-700">{movie.Actors}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Rating</h2>
        <p className="text-gray-700">{movie.imdbRating}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Genre</h2>
        <p className="text-gray-700">{movie.Genre}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
