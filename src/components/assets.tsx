
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { columns, Asset } from "./assetColumns";
import { AssetDataTable } from "./assetTable";
import AssetForm from "./asssetForm";
import { ExternalDataTable } from "./externalTable";

export default function Assets() {
  const data: Asset[] = [
    {
      id: "728ed52f",
      assetName: "Internal Asset 3",
      category: "Internal",
      subCategory: "Laptop",
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
      assetName: "Internal Asset 1",
      category: "Internal",
      subCategory: "Stocks",
      type: "Mouse",
      condition: "Good",
      location: "ISTI Dept",
      availabilityStatus: "Available",
      serialNumber: "728ed52f",
      specifications: "eme",
      amount: 1200,
      warrantyDuration: 2,
      warrantyDueDate: "02/24/2027",
      purchaseDate: "02/24/2025",
      aging: 0,
      notes: "eme",
    },
    {
      id: "728ed52h",
      assetName: "Internal Asset 2",
      category: "Internal",
      subCategory: "Printers",
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
    <div className="flex-col ml-[calc(7rem+10px)] mt-[calc(1.5rem+10px)] w-screen mr-10 mb-10">
      <Tabs defaultValue="Internal" className="w-">
        <TabsList className="rounded-xl w-full">
          <TabsTrigger value="Internal" className="w-full text-black">Internal</TabsTrigger>
          <TabsTrigger value="External" className="w-full text-black">External</TabsTrigger>
        </TabsList>
        <TabsContent value="Internal">
          <div className="bg-white rounded-xl">
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
              <AssetDataTable columns={columns} data={data} />
              <AssetForm />
            </div>
          </div>
        </TabsContent>
      <TabsContent value="External">
        <div className="bg-white rounded-xl mt-0">
          <p className="font-medium text-lg px-10 pt-4">External Assets</p>
          <div className="container py-2 mt-0">
            <ExternalDataTable columns={columns} data={data} />
          </div>
        </div>
      </TabsContent></Tabs>
    </div>
  );
}
