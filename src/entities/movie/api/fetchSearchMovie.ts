import { axiosInstance } from "@/shared/api/axiosInstance";

export const fetchSearchMovie = async (query: string) => {
  if (!query) return [];

  const response = await axiosInstance.get("/search/movie", {
    params: {
      query,
      page: 1,
    },
  });

  return response.data.results.slice(0, 5);
};
