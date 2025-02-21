import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Assets from "./components/assets";
import Borrowed from "./components/borrowed";
import Repair from "./components/repair";
import Issuance from "./components/issuance";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row bg-slate-50">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Assets" element={<Assets />} />
          <Route path="/Borrowed" element={<Borrowed />} />
          <Route path="/Repair" element={<Repair />} />
          <Route path="/Issuance" element={<Issuance />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
