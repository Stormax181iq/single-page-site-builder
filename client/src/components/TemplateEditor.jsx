import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

import ActionButton from "./ActionButton";
import { useEffect, useState } from "react";
import templateService from "../services/templateService";
export default function TemplateEditor({
  templateSrc = null,
  editorRef,
  templateId,
}) {
  const [previewUrl, setPreviewUrl] = useState("/api" + templateSrc);
  const [form, setForm] = useState({});
  const { isAuthenticated } = useAuth();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handlePreview(e) {
    e.preventDefault();
    await templateService.sendContentFields(templateId, form);
  }
  useEffect(() => {
    setPreviewUrl("/api" + templateSrc);
  }, [templateSrc]);

  useEffect(() => {
    const fetchPlaceholders = async (templateId) => {
      const placeholders = await templateService.getPlaceholders(templateId);
      setForm(placeholders);
    };

    fetchPlaceholders(templateId);
  }, [templateId]);

  return (
    <div className="mx-[15vh] mt-8 mb-4">
      <h2
        ref={editorRef}
        className="font-heading text-4xl font-semibold text-main-2 mb-2"
      >
        Personalise your template
      </h2>
      <div className="grid w-full h-[80vh] grid-cols-4">
        <form
          className="flex flex-col col-span-1 justify-between"
          onSubmit={handlePreview}
        >
          {form &&
            Object.entries(form).map(([key, value]) => {
              return (
                <div className="relative m-4">
                  <label
                    className="absolute px-1 -top-2 left-4 bg-main-1 text-sm"
                    htmlFor={key}
                  >
                    {key}
                  </label>
                  <input
                    className="px-2 py-4 rounded-sm border border-main-2 focus:ring-secondary"
                    type="text"
                    key={key}
                    id={key}
                    name={key}
                    value={value || ""}
                    onChange={handleChange}
                    placeholder={key}
                  />
                </div>
              );
            })}
          <div className="flex w-full bottom-0 relative">
            <ActionButton type="submit" className="w-full mx-4">
              Preview
            </ActionButton>
          </div>
        </form>
        <div className="w-full col-span-3 border rounded-lg">
          {isAuthenticated ? (
            templateSrc ? (
              <>
                <iframe
                  className="w-full h-full"
                  src={previewUrl}
                  frameborder="0"
                  allowFullScreen
                ></iframe>
              </>
            ) : (
              <>
                <p className="m-2 text-center">Please choose a template</p>
              </>
            )
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
