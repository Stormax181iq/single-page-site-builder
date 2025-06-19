import axios from "axios";

export async function getTemplates() {
  try {
    const templateInfos = await axios.get("/api/templates");
    console.log(templateInfos);
    return templateInfos;
  } catch (error) {
    console.error(error);
  }
}

export default { getTemplates };
