import { ExternalAsset, columns } from "./externalAssetsColumns";
import { ExternalDataTable } from "./externalTable";

function External() {
  const data:ExternalAsset[] = [
    {
      id: "728ed52f",
      name: "External Asset 3",
      category: "External",
      subCategory: "Gantry Routers",
      type: "None",
      condition: "Good",
      location: "ISTI Dept",
      availabilityStatus: "Available",
      serialNumber: "728ed52f",
      specifications: "eme",
      amount: 7000,
      warrantyDuration: 2,
      warrantyDueDate: "02/24/2027",
      purchaseDate: "02/24/2025",
      aging: 0,
      notes: "eme",
    },
    {
      id: "728ed52g",
      name: "External Asset 1",
      category: "External",
      subCategory: "Gantry Routers",
      type: "None",
      condition: "Good",
      location: "ISTI Dept",
      availabilityStatus: "Available",
      serialNumber: "728ed52f",
      specifications: "eme",
      amount: 10000,
      warrantyDuration: 2,
      warrantyDueDate: "02/24/2027",
      purchaseDate: "02/24/2025",
      aging: 0,
      notes: "eme",
    },
    {
      id: "728ed52h",
      name: "External Asset 2",
      category: "External",
      subCategory: "Gantry Routers",
      type: "None",
      condition: "Good",
      location: "ISTI Dept",
      availabilityStatus: "Available",
      serialNumber: "728ed52f",
      specifications: "eme",
      amount: 7000,
      warrantyDuration: 2,
      warrantyDueDate: "02/24/2027",
      purchaseDate: "02/24/2025",
      aging: 0,
      notes: "eme",
    },
  ];
  return (
    <>
      <div className="w-full h-screen bg-white rounded-xl m-10 ">
        <p className="font-medium text-lg mt-5 px-10">
          External Assets
        </p>
        <div className="container py-2 mt-0">
          <ExternalDataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default External;