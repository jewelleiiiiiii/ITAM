import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewTable from "./newtable";

function Internal() {
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
      <div className="w-full h-screen bg-white rounded-xl mt-10 ">
        <NewTable />
      </div>
    </div>
  );
}

export default Internal;
