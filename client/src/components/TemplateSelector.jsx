import { useState } from "react";

import TemplateCard from "../components/TemplateCard";
import { useEffect } from "react";
import templateService from "../services/templateService";

export default function TemplateSelector() {
  const [selected, setSelected] = useState(null);
  const [templates, setTemplates] = useState([
    { name: null, endpoint: null, imgSrc: null },
  ]);

  console.log(templates);
  useEffect(() => {
    const fetchTemplates = async () => {
      const templateInfos = await templateService.getTemplates();
      setTemplates(templateInfos);
    };

    fetchTemplates();
  }, []);
  return (
    <div className="mx-[15vh] my-4 font-display">
      <h2 className="font-heading text-main-2 text-4xl font-semibold mb-2">
        Select a template
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {templates &&
          templates.map((template, i) => {
            return (
              <TemplateCard
                key={template.name}
                selected={selected === i}
                templateId={i}
                templateName={template.name}
                thumbnailSrc={template.imgSrc}
                setSelected={setSelected}
              />
            );
          })}
      </div>
    </div>
  );
}
