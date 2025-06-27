import { axiosInstance } from "@/shared/api/axiosInstance";

export const fetchAllMovies = async ({ pageParam = 1 }) => {
  const response = await axiosInstance.get("/discover/movie", {
    params: {
      page: pageParam,
      sort_by: "popularity.desc",
    },
  });
  return {
    results: response.data.results,
    nextPage: pageParam + 1,
    totalPages: response.data.total_pages,
  };
};
