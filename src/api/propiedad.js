import axios from "axios";
import config from "../config";

export const getById = async (id) => {
  try {
    const response = await axios.get(`${config.backendUrl}/api/Propiedad/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la propiedad:", error);
    throw error;
  }
};