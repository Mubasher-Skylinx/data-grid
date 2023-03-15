import React from "react";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";

import data from "../../data/data";

const columns = [
    {
        accessorKey: "name",
    },
    {
        accessorKey: "email",
    },
    {
        accessorKey: "phone",
    },
    {
        accessorKey: "url",
    },
    {
        accessorKey: "group",
    },
    {
        accessorKey: "address",
    },
    {
        accessorKey: "city",
    },
    {
        accessorKey: "state",
    },
    {
        accessorKey: "zip",
    },
];

export default function ColumnPagination() {
    return (
        <>
            <Table
                {...{
                    data,
                    columns,
                }}
            />
        </>
    );
}

function Table({ data, columns }) {
    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        //
        debugTable: true,
    });

    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: "<",
                                                    desc: ">",
                                                }[header.column.getIsSorted()] ?? "^"}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>

                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[1, 2, 3, 4, 5].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
