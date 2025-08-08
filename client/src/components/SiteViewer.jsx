import useAuth from "../hooks/useAuth";

import { Link } from "react-router";
import ActionButton from "./ActionButton";

export default function SiteViewer({ previewUrl }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <iframe
          className="w-full h-full"
          src={previewUrl}
          frameborder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <p className="m-2 text-center">
            Not authenticated. Your session may have expired. Please login again
            :
          </p>
          <div className="w-full flex justify-center">
            <ActionButton className="px-4">
              <Link to="/auth/login">Login</Link>
            </ActionButton>
          </div>
        </>
      )}
    </>
  );
}
