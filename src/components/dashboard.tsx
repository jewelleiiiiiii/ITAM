function Dashboard() {
  return (
    <>
      <div className="flex flex-col w-full h-screen gap-4">
        <div className="w-full h-1/3 flex flex-row justify-around items-start gap-8 pl-4 pr-4 pt-4 pb-2">
          <div className="bg-white h-full rounded-xl w-full shadow-lg"></div>
          <div className="bg-white h-full rounded-xl w-full shadow-lg"></div>
          <div className="bg-white h-full rounded-xl w-full shadow-lg"></div>
          <div className="bg-white h-full rounded-xl w-full shadow-lg"></div>
        </div>
        <div className="w-full h-1/3 flex flex-row justify-around items-start gap-8 pl-4 pr-4 pt-0 pb-2">
          <div className="bg-white h-full rounded-xl w-3/4 shadow-lg"></div>
          <div className="bg-white h-full rounded-xl w-1/4 shadow-lg"></div>
        </div>
        <div className="w-full h-1/3 flex flex-row justify-around items-start gap-8 pl-4 pr-4 pt-0 pb-4">
          <div className="bg-white h-full rounded-xl w-3/4 shadow-lg"></div>
          <div className="bg-white h-full rounded-xl w-1/4 shadow-lg"></div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
