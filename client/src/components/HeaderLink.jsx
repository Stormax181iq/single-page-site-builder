import { Link } from "react-router";

export default function HeaderLink({ to, className, children }) {
  return (
    <Link
      to={to}
      className={"text-lg font-medium p-2 mx-1 underline" + " " + className}
    >
      {children}
    </Link>
  );
}
