import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "./ActionButton";
export default function TemplateCard() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="group relative w-64 rounded-xl">
      <img className="rounded-xl z-0" src="https://picsum.photos/1400/1200" />
      <div className="rounded-xl absolute flex justify-center items-center p-1 top-0 z-1 w-full h-full">
        {selected ? (
          <button
            onClick={() => setSelected(!selected)}
            title="Unselect"
            className="absolute flex items-center justify-center cursor-pointer border-2 border-main-2 top-1 left-1 w-6 h-6 rounded-full bg-main-1"
          >
            <FontAwesomeIcon className="text-main-2" icon={faCheck} />
          </button>
        ) : (
          <>
            <div className="absolute rounded-xl top-0 w-full h-full group-hover:bg-black opacity-25"></div>
            <ActionButton
              onClick={() => setSelected(!selected)}
              className="z-2 hidden group-hover:block w-32"
            >
              SELECT
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
}
