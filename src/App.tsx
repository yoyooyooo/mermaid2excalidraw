import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import Playground from "./playground/index";

const App = () => {
  return (
    <BrowserRouter>
      {/* <NuqsAdapter> */}
      <Routes>
        <Route path="/" element={<Playground />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* </NuqsAdapter> */}
    </BrowserRouter>
  );
};

export default App;
