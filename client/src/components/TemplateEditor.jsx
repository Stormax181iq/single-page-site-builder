import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

import ActionButton from "./ActionButton";
export default function TemplateEditor() {
  const { isAuthenticated } = useAuth();
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
        <div className="w-full col-span-3 border rounded-lg">
          {isAuthenticated ? (
            <iframe
              className="w-full h-full"
              src="/api/templates/files/car-rent/index.html"
              frameborder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <p className="m-2 text-center">
                Not authenticated. Your session may have expired. Please login
                again :
              </p>
              <div className="w-full flex justify-center">
                <ActionButton className="px-4">
                  <Link to="/auth/login">Login</Link>
                </ActionButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
