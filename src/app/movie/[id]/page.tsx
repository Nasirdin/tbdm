import { axiosInstance } from "@/shared/api/axiosInstance";
import styles from "./page.module.scss";
import { PopularMovies } from "@/widgets/PopularMovies";
import { BackButton } from "@/shared/ui/BackButton";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
}

const ImgUrl = process.env.NEXT_PUBLIC_TMDB_IMG_URL;

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await axiosInstance.get<MovieDetails>(`/movie/${params.id}`);

  return (
    <div className={styles.movie}>
      <div className={styles.movie__box}>
        <div
          className={styles.movie__backdrop}
          style={{
            backgroundImage: `url(${ImgUrl}${data.backdrop_path})`,
          }}
        >
          <div className={styles.overlay}></div>
        </div>
        <div className="container">
          <BackButton />
          <div className={styles.movie__content}>
            <div className={styles.movie__poster}>
              <img src={ImgUrl + data.poster_path} alt={data.title} />
            </div>

            <div className={styles.movie__info}>
              <h1 className={styles.movie__title}>{data.title}</h1>
              <p className={styles.movie__release}>
                Дата выхода: <span>{data.release_date}</span>
              </p>

              <div className={styles.movie__genres}>
                <p>Жанр:</p>
                <ul>
                  {data.genres.map((genre) => (
                    <li key={genre.id} className={styles.movie__genre}>
                      {genre.name},
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.movie__overview}>{data.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <PopularMovies />
    </div>
  );
}
