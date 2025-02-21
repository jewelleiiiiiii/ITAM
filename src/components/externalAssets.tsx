import NewTable from "./newtable";

function External() {
  return (
    <>
      <div className="w-full h-screen bg-white rounded-xl m-10 ">
        <p className="font-medium text-lg font-serif pl-2 mt-5 ml-2">External Assets</p>
        <NewTable />
      </div>
    </>
  );
}

export default External;
