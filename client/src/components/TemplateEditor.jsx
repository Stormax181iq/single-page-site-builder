import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";

import ActionButton from "./ActionButton";
import { useEffect, useState } from "react";
import templateService from "../services/templateService";
import sitesService from "../services/sitesService";

export default function TemplateEditor({
  templateSrc = null,
  editorRef,
  templateId,
}) {
  const baseUrl = "http://localhost:5173/api";
  const [previewUrl, setPreviewUrl] = useState(baseUrl + templateSrc);
  const [form, setForm] = useState({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function buildUrl(baseUrl, templateName, params) {
    const url = new URL(
      baseUrl + "/templates/previews/" + templateName + "/index.html"
    );
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, value);
    }

    url.search = searchParams.toString();
    return url.toString();
  }

  async function handlePreview(e) {
    e.preventDefault();
    setPreviewUrl(buildUrl(baseUrl, templateId, form));
  }

  async function handleSave(e) {
    e.preventDefault();
    await sitesService.saveUserSite(templateId, form);
    navigate("/my-sites");
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
        <form className="flex flex-col col-span-1 justify-between">
          <div>
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
          </div>
          <div className="flex w-full bottom-0 relative">
            <ActionButton onClick={handlePreview} className="w-1/2 mx-4">
              Preview
            </ActionButton>
            <ActionButton onClick={handleSave} className="w-1/2 mx-4">
              Save to your Sites
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
