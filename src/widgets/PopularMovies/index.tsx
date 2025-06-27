"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/shared/api/axiosInstance";
import styles from "./index.module.scss";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const ImgUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL || "";

export const PopularMovies = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ results: Movie[] }>(
        "/movie/popular",
        { params: { page: 1 } }
      );
      return data.results;
    },
  });

  if (isLoading) return <div>Загрузка популярных фильмов...</div>;
  if (isError) return <div>Ошибка загрузки популярных фильмов</div>;

  return (
    <div className={styles.popular}>
      <div className="container">
        <h2 className={styles.popular__title}>Популярные фильмы</h2>

        <div className={styles.popular__grid}>
          {data?.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className={styles.popular__card}
            >
              <img
                src={
                  movie.poster_path
                    ? ImgUrl + movie.poster_path
                    : "/no-image.jpg"
                }
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
