import api from "./api";

export const getPets = async () => {
  try {
    const response = await api.get("/pets");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const postPets = async () => {
  try {
    const response = await api.post("/pets");
    return response.data;
  } catch (error) {
    throw error;
  }
};
