import HeaderLink from "./HeaderLink";
import ActionButton from "./ActionButton";
import { Link } from "react-router";

export default function Header() {
  const isAuthenticated = false;
  function handleLogout() {
    return;
  }
  return (
    <header className="flex w-full justify-around items-center h-[10vh] bg-main-2 text-main-1">
      <Link className="p-1" to="/">
        <h1 className="font-heading text-3xl font-bold">
          Single page site builder
        </h1>
      </Link>
      <nav>
        {isAuthenticated ? (
          <>
            <HeaderLink to="/my-sites">My sites</HeaderLink>
            <button className="font-medium cursor-pointer p-2 mx-1" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <HeaderLink to="/auth/login">Login</HeaderLink>
            <Link to="/auth/register">
              <ActionButton style={1}>Register</ActionButton>
            </Link>
          </>
        )}  
      </nav>
    </header>
  );
}
