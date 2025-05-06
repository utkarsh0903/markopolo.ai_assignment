import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
  } from "@tanstack/react-table";
  import { useState, useMemo } from "react";
  import "./DisplayUserTable.css";
  import sortIcon from "../assets/down-arrow.png";

  export default function DisplayUserTable({ users }) {
    const [sorting, setSorting] = useState([]);
    const [search, setSearch] = useState("");
  
    const filteredData = useMemo(() => {
      return users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }, [search, users]);
  
    const columns = useMemo(
      () => [
        {
          header: "Name",
          accessorKey: "name",
        },
        {
          header: "Email",
          accessorKey: "email",
        },
        {
          header: "Phone",
          accessorKey: "phone",
          cell: ({ getValue }) => {
            const digits = (getValue() || "").replace(/\D/g, "");
            return `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
          },
        },
        {
          header: "Company (City)",
          cell: ({ row }) =>
            `${row.original.company?.name || "-"} (${row.original.address?.city || "-"})`,
        },
      ],
      []
    );
  
    const table = useReactTable({
      data: filteredData,
      columns,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  
    return (
      <div className="user-table-wrapper">
        <div className="user-table-header-top">
          <h1 className="user-table-title">User Directory</h1>
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
  
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                 <th
                 key={header.id}
                 onClick={
                   header.column.columnDef.accessorKey === "name" ||
                   header.column.columnDef.accessorKey === "email"
                     ? header.column.getToggleSortingHandler()
                     : undefined
                 }
                 className={
                   header.column.columnDef.accessorKey === "name" ||
                   header.column.columnDef.accessorKey === "email"
                     ? "sortable-header"
                     : ""
                 }
               >
                 {flexRender(header.column.columnDef.header, header.getContext())}
                 {(header.column.columnDef.accessorKey === "name" ||
                   header.column.columnDef.accessorKey === "email") && (
                   <img
                     src={sortIcon}
                     alt="Sort"
                     className={`sort-icon-img ${
                       header.column.getIsSorted() === "asc"
                         ? "rotate-90"
                         : header.column.getIsSorted() === "desc"
                         ? "rotate-270"
                         : ""
                     }`}
                   />
                 )}
               </th>
               
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr key={row.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }