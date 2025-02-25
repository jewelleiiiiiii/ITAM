import { BorrowedAsset, columns } from "./borrowedColumns";
import { BorrowedDataTable } from "./borrowedTable";

export default function Borrowed() {
  const data: BorrowedAsset[] = [
    {
      id: "3",
      userId: 1,
      userName: "Jewel Lei",
      assetId: 1,
      assetName: "Borrowed Asset 3",
      dateBorrowed: "02/24/2025",
      dueDate: "N/A",
      returnDate: "N/A",
      duration: "100 days",
      condition: "Good",
      remarks: "None",
    },
    
  ];

  return (
    <div className="w-full h-screen bg-white rounded-xl m-10 ">
      <p className="font-medium text-lg mt-5 px-10">Borrowed Assets</p>
      <div className="container py-3 mt-0">
        <BorrowedDataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
