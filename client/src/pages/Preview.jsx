import { useParams } from "react-router";
import SiteViewer from "../components/SiteViewer";
import Header from "../components/Header";

export default function Preview() {
  const { id } = useParams();

  const previewUrl = `/api/sites/${id}/`;

  return (
    <>
      <Header />
      <div className="h-[100vh]">
        <SiteViewer previewUrl={previewUrl} />
      </div>
    </>
  );
}
