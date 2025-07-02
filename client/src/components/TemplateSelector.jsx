import TemplateCard from "../components/TemplateCard";

export default function TemplateSelector({
  templates,
  selected,
  setSelected,
  editorRef,
}) {
  return (
    <div className="mx-[15vh] my-4 font-display">
      <h2 className="font-heading text-main-2 text-4xl font-semibold mb-2">
        Select a template
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {templates &&
          templates.map((template) => {
            return (
              <TemplateCard
                key={template.name}
                selected={selected === template.name}
                templateName={template.name}
                thumbnailSrc={template.imgSrc}
                setSelected={setSelected}
                editorRef={editorRef}
              />
            );
          })}
      </div>
    </div>
  );
}
