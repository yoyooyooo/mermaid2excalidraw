import { Monitoring } from "react-scan/monitoring";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Playground from "./playground/index";

// Create a wrapper component for Monitoring since we need router hooks
function MonitoringWrapper() {
  const location = useLocation();

  return (
    <Monitoring
      apiKey="nM_pcQwv3wBwu38z9q20ckV1-uMvtdUx"
      url="https://monitoring.react-scan.com/api/v1/ingest"
      commit={process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA}
      branch={process.env.REACT_APP_VERCEL_GIT_COMMIT_REF}
      params={{}} // You can add route params here if needed
      path={location.pathname}
    />
  );
}

const App = () => {
  return (
    <BrowserRouter>
      {/* <NuqsAdapter> */}
      <MonitoringWrapper />
      <Routes>
        <Route path="/" element={<Playground />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* </NuqsAdapter> */}
    </BrowserRouter>
  );
};

export default App;
