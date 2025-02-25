import { columns, IssuanceAsset } from "./issuanceColumns";
import IssuanceForm from "./issuanceForm";
import { IssuanceDataTable } from "./issuanceTable";

export default function Issuance() {
  const data: IssuanceAsset[] = [
    {
      id: "2",
      userId: 1,
      userName: "Jewel Lei",
      assetId: 1,
      assetName: "Issued Asset 2",
      issuanceDate: "02/25/2025",
      status: "Done",
    },
    
  ];

  return (
    <div className="w-full h-screen bg-white rounded-xl m-10 ">
      <p className="font-medium text-lg mt-5 px-10">Issued Assets</p>
      <div className="container py-3 mt-0">
        <IssuanceDataTable columns={columns} data={data} />
        <IssuanceForm/>
      </div>
    </div>
  );
}
