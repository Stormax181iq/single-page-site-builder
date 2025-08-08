import { useState, Fragment } from "react";

import ActionButton from "./ActionButton";
import { Link } from "react-router";

export default function UserSiteCard({ id, templateId, createdAt, values }) {
  const [isValuesShown, setIsValuesShown] = useState(false);

  const date = new Date(createdAt);

  return (
    <div className="w-2/3 mx-auto border m-4 rounded-xl p-2 bg-main-1 text-main-2">
      <h2 className="text-xl font-bold underline">
        <Link to={"/sites/" + id}>{templateId}</Link>
      </h2>
      <p>
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </p>
      <ActionButton
        className="my-2"
        style={2}
        onClick={() => setIsValuesShown(!isValuesShown)}
      >
        {isValuesShown ? "Hide custom content" : "Show custom content"}
      </ActionButton>

      {isValuesShown &&
        Object.entries(values).map(([key, value]) => (
          <div className="my-2" key={key}>
            <p className="font-bold">{key}</p>
            <p className="ml-1">{value}</p>
          </div>
        ))}
    </div>
  );
}
