import { Routes, Route } from "react-router";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
