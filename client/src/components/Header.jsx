import HeaderLink from "./HeaderLink";
import ActionButton from "./ActionButton";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="sticky top-0 z-50 flex w-full justify-around items-center h-[10vh] bg-main-2 text-main-1 shadow-md/25">
      <Link className="p-1" to="/">
        <h1 className="font-heading text-3xl font-bold">
          Single page site builder
        </h1>
      </Link>
      <nav>
        {isAuthenticated ? (
          <>
            <HeaderLink to="/my-sites">My sites</HeaderLink>
            <button
              className="font-medium cursor-pointer text-lg p-2 mx-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <HeaderLink to="/auth/login">Login</HeaderLink>
            <Link tabIndex={-1} to="/auth/register">
              <ActionButton className="text-lg" style={1}>
                Register
              </ActionButton>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
