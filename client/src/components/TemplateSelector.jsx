import { useState } from "react";

import TemplateCard from "../components/TemplateCard";

export default function TemplateSelector() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="mx-[15vh] my-4 font-display">
      <h2 className="font-heading text-main-2 text-4xl font-semibold mb-2">
        Select a template
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <TemplateCard
          selected={selected === 1}
          templateId={1}
          setSelected={setSelected}
        />
        <TemplateCard
          selected={selected === 2}
          templateId={2}
          setSelected={setSelected}
        />
        <TemplateCard
          selected={selected === 3}
          templateId={3}
          setSelected={setSelected}
        />
        <TemplateCard
          selected={selected === 4}
          templateId={4}
          setSelected={setSelected}
        />
        <TemplateCard
          selected={selected === 5}
          templateId={5}
          setSelected={setSelected}
        />
        <TemplateCard
          selected={selected === 6}
          templateId={6}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}
