import axios from "axios";

export const getCookie = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;  
  try {
    const response = await axios.get(`${baseUrl}/validateJwt`, {
      withCredentials: true,
    });        
    return await response.data

  } catch (error) {
    return error.message;
  }
};
