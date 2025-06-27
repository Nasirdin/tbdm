"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllMovies } from "@/entities/movie/api/fetchMovies";
import styles from "./page.module.scss";
import { useEffect, useRef } from "react";
import { Card } from "@/shared/ui/Cart";

const ImgUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL || "";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export default function HomePage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allMovies"],
    queryFn: fetchAllMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className="loading">
        <img
          src="https://i.pinimg.com/originals/8c/2e/d7/8c2ed7b212be0ae80652fe2c5f84bd0a.gif"
          alt="Загрузка..."
          width={200}
        />
      </div>
    );
  if (isError)
    return (
      <div className="loading">
        <img
          src="https://i.pinimg.com/originals/27/ee/71/27ee71b104a1d7d0fcc49383408911c7.gif"
          alt="Ошибка при загрузке фильмов"
          width={200}
        />
      </div>
    );

  return (
    <div className="container">
      <div className={styles.grid}>
        {data?.pages.map((page) =>
          page.results.map((movie: Movie) => (
            <Card key={movie.id} movie={movie} imgUrl={ImgUrl} />
          ))
        )}
      </div>

      <div ref={observerRef} style={{ height: 1 }} />
      {isFetchingNextPage && <p>Загрузка ... </p>}
    </div>
  );
}
