import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table } from "./ui/table";

function Internal() {
  return (
    <div className="w-full h-screen bg-amber-100 rounded-xl m-10">
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

      <Table />
    </div>
  );
}

export default Internal;
