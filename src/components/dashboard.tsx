import FourCards from "./ui/fourdashboardcard"; 
import TwoCards from "./ui/twodashboardcard";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col w-full h-screen gap-4">
        <FourCards />
        <TwoCards />
        <TwoCards />
      </div>
    </>
  );
}

export default Dashboard;
