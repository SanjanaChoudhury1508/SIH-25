import axios from "../utils/axiosInstance";

export const fetchInternships = async () => {
  const { data } = await axios.get("/internships");
  return data;
};
