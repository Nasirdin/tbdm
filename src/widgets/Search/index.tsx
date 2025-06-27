"use client";

import { useState, useEffect } from "react";
import { useSearchStore } from "@/shared/store/searchStore";
import { fetchSearchMovie } from "@/entities/movie/api/fetchSearchMovie";
import styles from "./index.module.scss";
import Link from "next/link";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const movies = useSearchStore((state) => state.movies);
  const setMovies = useSearchStore((state) => state.setMovies);
  const clearMovies = useSearchStore((state) => state.clearMovies);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchSearchMovie(debouncedQuery).then(setMovies);
    } else {
      clearMovies();
    }
  }, [debouncedQuery, setMovies, clearMovies]);

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Поиск фильмов..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
        autoComplete="off"
      />

      {movies.length > 0 && (
        <ul className={styles.moviesList}>
          {movies.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              className={styles.moviesList__link}
              onClick={() => {
                setSearchQuery("");
                clearMovies();
              }}
            >
              {movie.title} | {movie.release_date}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
