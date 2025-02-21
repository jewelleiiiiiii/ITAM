import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Assets() {
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

      {/* <table className="border-collapse border border-gray-400 table-fixed w-full">
          <thead>
            <tr>
              <th className="w-1/3 text-center">Sample</th>
              <th className="w-1/3 text-center">Sample</th>
              <th className="w-1/3 text-center">Sample</th>
            </tr>
          </thead>
        </table> */}
    </div>
  );
}

export default Assets;
