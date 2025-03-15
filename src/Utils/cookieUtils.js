import axios from "axios";

export const getCookie = async () => {
  try {
    const response = await axios.get("http://192.168.29.107:8080/validateJwt", {
      withCredentials: true,
    });        
    return await response.data

  } catch (error) {
    return error.message;
  }
};
