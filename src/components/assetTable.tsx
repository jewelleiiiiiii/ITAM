import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  ListFilter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import React, { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMisc } from "@/context/miscellaneousContext";

interface AssetDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AssetDataTable<TData, TValue>({
  columns,
  data,
  isLastTab,
}: AssetDataTableProps<TData, TValue> & { isLastTab: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const { type, typeID, setTypeID } = useMisc();
  const [selectedType, setSelectedType] = useState<{
    id: number | null;
    name: string;
  }>({
    id: null,
    name: "",
  });
  
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      table.getColumn("type_id")?.toggleVisibility(false);
      table.getColumn("warranty_duration")?.toggleVisibility(false);
      table.getColumn("asset_amount")?.toggleVisibility(false);
      table.getColumn("warranty_due_date")?.toggleVisibility(false);
      table.getColumn("purchase_date")?.toggleVisibility(false);
      table.getColumn("aging")?.toggleVisibility(false);
      table.getColumn("specifications")?.toggleVisibility(false);
      table.getColumn("notes")?.toggleVisibility(false);
      table.getColumn("insurance")?.toggleVisibility(false);
      initialized.current = true;
    }
  }, []);

  return (
    <div className="pl-10 pb-10 pr-10">
      <div className="flex justify-between">
        <div className="flex items-center py-4 justify-start gap-4">
          <Input
            type="text"
            placeholder="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-md min-w-sm"
          />
{isLastTab && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedType.name || "Filter Type"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search type..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    {type.map((typeItem) => (
                      <CommandItem
                        key={typeItem.type_id}
                        value={typeItem.type_id ?? ""}
                        onSelect={() => {
                          setSelectedType({ id: typeItem.type_id, name: typeItem.type_name });
                          setTypeID(typeItem.type_id);
                          setColumnFilters((prev) => [
                            ...prev.filter((f) => f.id !== "type_id"),
                            { id: "type_id", value: [typeItem.type_id] },
                          ]);
                          
                          setOpen(false);
                        }}
                      >
                        {typeItem.type_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedType.id === typeItem.type_id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>)}
        </div>

        <div className="flex justify-end gap-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[30px] justify-center text-center font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="m-auto h-4 w-4 p-auto" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>Filter by Date</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[30px] justify-center text-center font-normal"
                    >
                      <ListFilter className="m-auto h-4 w-4 p-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                             {column.id.replaceAll("_", " ")}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter Columns</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-col min-h-[calc(100vh-25rem)] max-h-[calc(100vh-25rem)] overflow-auto">
        <Table>
          <TableHeader className="bg-[#f0f1f3]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-300">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-gray-300"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-gray-300">
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
