export default function TemplateEditor() {
  return (
    <div className="mx-[15vh] mt-8 mb-4">
      <h2 className="font-heading text-4xl font-semibold text-main-2 mb-2">
        Personalise your template
      </h2>
      <div className="grid w-full h-[80vh] grid-cols-4">
        <div className="flex flex-col col-span-1">
          <p>test 1</p>
          <p>test 2</p>
        </div>
        <div className="w-full h-full col-span-3">
          <iframe
            className="w-full h-full border rounded-lg"
            src="/api/templates/files/car-rent"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
