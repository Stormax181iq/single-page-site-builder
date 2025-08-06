import axios from "axios";

export async function saveUserSite(templateId, form) {
  try {
    const response = await axios.post(`/api/sites`, {
      templateId,
      form,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserSites() {
  try {
    const response = await axios.get(`/api/sites`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default { saveUserSite, getUserSites };
