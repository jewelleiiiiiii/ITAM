import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns, InternalAsset } from "./internalAssetsColumns";
import { InternalDataTable } from "./internalTable";

export default function Internal() {
  const data: InternalAsset[] = [
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
    <div className="w-full h-screen bg-white rounded-xl m-10">
      <Tabs defaultValue="laptop" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="laptop">LAPTOP</TabsTrigger>
          <TabsTrigger value="printer">PRINTER</TabsTrigger>
          <TabsTrigger value="access_point">ACCESS POINT</TabsTrigger>
          <TabsTrigger value="routers_and_switch">
            ROUTERS AND SWITCH
          </TabsTrigger>
          <TabsTrigger value="stocks">STOCKS</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="container py-3 mt-0">
        <InternalDataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
