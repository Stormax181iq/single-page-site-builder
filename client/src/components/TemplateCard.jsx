import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "./ActionButton";
export default function TemplateCard({
  selected,
  setSelected,
  templateId,
  templateName,
  thumbnailSrc,
}) {
  return (
    <article
      className="aspect-[16/9] group relative rounded-xl"
      aria-label={`${templateName} template`}
    >
      <img
        className="rounded-xl z-0"
        src={thumbnailSrc}
        alt={`Preview of ${templateName} template`}
      />
      <div className="rounded-xl absolute flex shadow-lg/49 justify-center items-center p-1 top-0 z-1 w-full h-full">
        {selected ? (
          <button
            onClick={() => setSelected(null)}
            title="Unselect"
            className="absolute flex items-center justify-center cursor-pointer border-2 border-secondary top-1 left-1 h-1/12 aspect-square rounded-full bg-main-1"
          >
            <FontAwesomeIcon className="text-secondary fa-2xl" icon={faCheck} />
          </button>
        ) : (
          <>
            <div className="absolute rounded-xl top-0 w-full h-full group-hover:bg-black opacity-25"></div>
            <ActionButton
              onClick={() => setSelected(templateId)}
              className="z-2 hidden group-hover:block w-5/12 aspect-[4/1] text-xl"
            >
              SELECT
            </ActionButton>
          </>
        )}
      </div>
    </article>
  );
}
