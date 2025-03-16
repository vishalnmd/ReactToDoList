import axios from "axios";

export const getCookie = async () => {
  try {
    const response = await axios.get("http://localhost:8080/validateJwt", {
      withCredentials: true,
    });        
    return await response.data

  } catch (error) {
    return error.message;
  }
};
