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
import {
  EllipsisVertical,
  Eye,
  OctagonX,
  Trash,
  Trash2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface User {
  id: number;
  username: string;
  email: string;
  FullName: string;
}

const user: User[] = [
  {
    id: 1,
    username: "amanv123",
    email: "aman.verma@example.com",
    FullName: "Aman Verma",
  },
  {
    id: 2,
    username: "john_doe",
    email: "john.doe@example.com",
    FullName: "John Doe",
  },
  {
    id: 3,
    username: "jane_smith",
    email: "jane.smith@example.com",
    FullName: "Jane Smith",
  },
  {
    id: 4,
    username: "michael_b",
    email: "michael.b@example.com",
    FullName: "Michael Brown",
  },
  {
    id: 5,
    username: "emily.j",
    email: "emily.j@example.com",
    FullName: "Emily Johnson",
  },
  {
    id: 6,
    username: "robert.w",
    email: "robert.williams@example.com",
    FullName: "Robert Williams",
  },
  {
    id: 7,
    username: "lisa.m",
    email: "lisa.miller@example.com",
    FullName: "Lisa Miller",
  },
  {
    id: 8,
    username: "david_s",
    email: "david.smith@example.com",
    FullName: "David Smith",
  },
  {
    id: 9,
    username: "sarah_l",
    email: "sarah.lewis@example.com",
    FullName: "Sarah Lewis",
  },
  {
    id: 10,
    username: "chris_j",
    email: "chris.jones@example.com",
    FullName: "Chris Jones",
  },
];

const GetReportTable: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>("");

  const handleSearchChange = (value: string) => {
    setFilterValue(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // reset to the first page on search
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({
      pageIndex: 0, // reset to the first page on rows per page change
      pageSize: Number(
        e.target?.value === "all" ? filteredData.length : e.target?.value
      ),
    });
  };

  const filteredData = useMemo(() => {
    let data = user ?? [];

    if (filterValue) {
      data = data?.filter((user: User) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return data;
  }, [user, filterValue]);

  const columns: ColumnDef<User>[] = useMemo(
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
        accessorKey: "FullName",
        header: "Reported By",
        cell: ({ row }) => <div>{capitalize(row.getValue("FullName"))}</div>,
      },
      {
        accessorKey: "username",
        header: "Reported On",
        cell: ({ row }) => <div>{capitalize(row.getValue("username"))}</div>,
      },
      // {
      //   accessorKey: "email",
      //   header: "Email",
      //   cell: ({ row }) => <div>{capitalize(row.getValue("email"))}</div>,
      // },

      {
        accessorKey: "id",
        header: "Actions",
        cell: () => (
          <div className="relative inline-block text-left">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"ghost"}>
                  <EllipsisVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Eye />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="h-[350px] w-[575px] rounded-xl">
                    <ScrollArea></ScrollArea>
                  </DialogContent>
                </Dialog>

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
                        onClick={() => {}}
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
        ),
      },
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
