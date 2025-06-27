import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface SearchStore {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  clearMovies: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  movies: [],
  setMovies: (movies: Movie[]) => set({ movies: movies }),
  clearMovies: () => set({ movies: [] }),
}));
