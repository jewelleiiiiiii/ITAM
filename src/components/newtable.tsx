import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function NewTable() {
  return (
    <>
      <div className="w-full  flex flex-row items-center justify-between p-4 rounded-xl mt-4">
        <p className="font-medium text-lg font-serif pl-2">External Assets</p>
      </div>
      <div className="pr-15 pl-15">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Availability Status</TableHead>
              <TableHead className="text-right">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableCell className="text-right">Sample</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableCell className="text-right">Sample</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">3</TableCell>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableCell className="text-right">Sample</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">4</TableCell>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Sample</TableHead>
              <TableCell className="text-right">Sample</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default NewTable;
