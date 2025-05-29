import TemplateCard from "../components/TemplateCard";

export default function TemplateSelector() {
  return (
    <div className="mx-[15vh] my-4 font-display">
      <h2 className="font-heading text-2xl font-semibold">Select a template</h2>
      <div>
        <TemplateCard />
      </div>
    </div>
  );
}
