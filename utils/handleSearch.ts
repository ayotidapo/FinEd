import axios from "axios";

export const handleSearch = async (searchQuery: any) => {
  const { data } = await axios.get(`/courses-user/search-courses?skip=0&take=12&searchQuery=${searchQuery}`);
  return {
    courses: data.courses,
    totalCount: data.totalCount,
  };
}
