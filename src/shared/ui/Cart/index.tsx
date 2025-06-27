import Link from "next/link";
import styles from "./index.module.scss";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface CardProps {
  movie: Movie;
  imgUrl: string;
}

export const Card = ({ movie, imgUrl }: CardProps) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className={styles.card}>
        {movie.poster_path ? (
          <img
            className={styles.card__img}
            src={imgUrl + movie.poster_path}
            alt={movie.title}
          />
        ) : (
          <div className={styles.noImage}>Нет изображения</div>
        )}
        <h3 className={styles.card__title}>{movie.title}</h3>
        <p className={styles.card__date}>{movie.release_date}</p>
      </div>
    </Link>
  );
};
