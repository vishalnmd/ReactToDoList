import axios from "axios";

export const getCookie = async () => {
  try {
    const response = await axios.get("https://todolist-backend-tes5.onrender.com/validateJwt", {
      withCredentials: true,
    });        
    return await response.data

  } catch (error) {
    return error.message;
  }
};
