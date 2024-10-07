"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalize } from "../utils/capitalize";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { EllipsisVertical, Eye, OctagonX, Trash, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ReportUserDetails from "../helper-components/report-user-details";
import { useRouter } from "next/navigation";

interface User {
  id?: number;
  username?: string;
  email?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  fullName?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DataItem {
  id: number;
  email: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phoneNumber: string;
  user: User | null;
}

const user: DataItem[] = [
  {
    id: 13,
    email: "ran@gmail.com",
    name: "Ranveer",
    message: "Reporting Alia",
    createdAt: "2024-10-07T15:55:51.090Z",
    updatedAt: "2024-10-07T15:55:51.090Z",
    publishedAt: "2024-10-07T15:55:51.083Z",
    phoneNumber: "9015663658",
    user: {
      id: 11,
      username: "Ram",
      email: "ram@gmail.com",
      provider: "local",
      confirmed: true,
      blocked: false,
      fullName: "Ram Verma",
      createdAt: "2024-10-07T15:41:44.429Z",
      updatedAt: "2024-10-07T15:42:31.855Z",
    },
  },
  {
    id: 14,
    email: "ran@gmail.com",
    name: "Ranveer",
    message: "Reporting Pihu",
    createdAt: "2024-10-07T16:27:32.619Z",
    updatedAt: "2024-10-07T16:27:32.619Z",
    publishedAt: "2024-10-07T16:27:32.615Z",
    phoneNumber: "9015663658",
    user: {
      id: 9,
      username: "Pihu",
      email: "pihu@gmail.com",
      provider: "local",
      confirmed: true,
      blocked: false,
      fullName: "Pihu Sharma",
      createdAt: "2024-10-07T15:41:01.369Z",
      updatedAt: "2024-10-07T15:41:01.369Z",
    },
  },
];

const GetReportTable: React.FC = () => {
  const router = useRouter()
  const [filterValue, setFilterValue] = useState<string>("");

  const handleSearchChange = (value: string) => {
    setFilterValue(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({
      pageIndex: 0,
      pageSize: Number(
        e.target?.value === "all" ? filteredData.length : e.target?.value
      ),
    });
  };

  const filteredData = useMemo(() => {  
    let data = user ?? [];

    if (filterValue) {
      data = data?.filter((user: DataItem) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return data;
  }, [user, filterValue]);

  const columns: ColumnDef<DataItem>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
      },
      {
        accessorKey: "name",
        header: "Reported By",
        cell: ({ row }) => <div>{capitalize(row.getValue("name"))}</div>,
      },
      {
        accessorKey: "user",
        header: "Reported On",
        cell: ({ row }) => {
          const user: User = row.getValue("user");
          console.log(user.fullName)

          return (
            <div>{user.username}</div>
          )
        }
      },
      {
        accessorKey: "id",
        header: "Actions",
        cell: ({ row }) => {
          const rowData = row.original;
          console.log(rowData)
      
          return (
            <div className="relative inline-block text-left">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"ghost"}>
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 p-4">
                 
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={()=> {router.push(`/dashboard/reports/${row.getValue("id")}`);}}
                      >
                        <Eye />
                        View
                      </Button>
                    
      
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                      >
                        <Trash2 />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
                      <DialogTitle className="text-lg font-bold">
                        Delete Subscription Plan
                      </DialogTitle>
                      <p className="text-gray-700">
                        Are you sure you want to delete this user?
                      </p>
                      <div className="flex items-center gap-4 justify-center">
                        <Button
                          variant="destructive"
                          className="flex items-center gap-1"
                          onClick={() => {
                            // Perform delete action here
                          }}
                        >
                          <Trash size={18} /> Delete
                        </Button>
                        <Button
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          <OctagonX size={18} />
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </PopoverContent>
              </Popover>
            </div>
          );
        },
      }
      
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    data: filteredData ?? [],
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Search by name..."
            value={filterValue}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {user?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} Plans found.
          </span>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">
              Rows per page:
              <select
                className="ml-2 bg-transparent outline-none text-muted-foreground"
                value={pagination.pageSize}
                onChange={handleRowsPerPageChange}
              >
                <option value="all">all</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
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
      </div>
    </>
  );
};

export default GetReportTable;
