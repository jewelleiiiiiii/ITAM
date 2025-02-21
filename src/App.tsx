import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Borrowed from "./components/borrowed";
import Repair from "./components/repair";
import Issuance from "./components/issuance";
import Internal from "./components/internalAssets";
import External from "./components/externalAssets";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row bg-slate-50">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Internal" element={<Internal />} />
          <Route path="/External" element={<External />} />
          <Route path="/Borrowed" element={<Borrowed />} />
          <Route path="/Repair" element={<Repair />} />
          <Route path="/Issuance" element={<Issuance />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
