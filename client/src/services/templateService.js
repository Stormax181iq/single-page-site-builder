import axios from "axios";

export async function getTemplates() {
  try {
    const response = await axios.get("/api/templates");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default { getTemplates };
