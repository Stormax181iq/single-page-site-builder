import { useEffect, useState } from "react";

import templateService from "../services/templateService";
import Header from "../components/Header";
import TemplateSelector from "../components/TemplateSelector";
import TemplateEditor from "../components/TemplateEditor";

export default function Index() {
  const [selected, setSelected] = useState(null);

  const [templates, setTemplates] = useState([
    { name: null, endpoint: null, imgSrc: null },
  ]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const templateInfos = await templateService.getTemplates();
      setTemplates(templateInfos);
    };

    fetchTemplates();
  }, []);
  return (
    <>
      <Header />
      <TemplateSelector
        templates={templates}
        selected={selected}
        setSelected={setSelected}
      />
      <TemplateEditor
        templateSrc={
          templates &&
          templates.find((template) => template.name === selected)?.endpoint
        }
      />
    </>
  );
}
