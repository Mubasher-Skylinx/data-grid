import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";

import { makeData } from "../../data/makeData";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

export default function RowSelectable() {
    const [rowSelection, setRowSelection] = useState({});

    const columns = useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                header: "Name",
                columns: [
                    {
                        accessorKey: "firstName",
                        cell: (info) => info.getValue(),
                    },
                    {
                        accessorFn: (row) => row.lastName,
                        id: "lastName",
                        cell: (info) => info.getValue(),
                        header: () => <span>Last Name</span>,
                    },
                ],
            },
            {
                header: "Info",
                columns: [
                    {
                        accessorKey: "age",
                        header: () => "Age",
                    },
                    {
                        header: "More Info",
                        columns: [
                            {
                                accessorKey: "visits",
                                header: () => <span>Visits</span>,
                            },
                            {
                                accessorKey: "status",
                                header: "Status",
                            },
                            {
                                accessorKey: "progress",
                                header: "Profile Progress",
                            },
                        ],
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = useState(() => makeData(100000));

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter
                                                            column={header.column}
                                                            table={table}
                                                        />
                                                    </div>
                                                ) : null}
                                            </>
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
                <tfoot>
                    <tr>
                        <td className="p-1">
                            <IndeterminateCheckbox
                                {...{
                                    checked: table.getIsAllPageRowsSelected(),
                                    indeterminate: table.getIsSomePageRowsSelected(),
                                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                                }}
                            />
                        </td>
                        <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
                    </tr>
                </tfoot>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
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
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                {Object.keys(rowSelection).length} of {table.getPreFilteredRowModel().rows.length}{" "}
                Total Rows Selected
            </div>
            <hr />

            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() => console.info("rowSelection", rowSelection)}
                >
                    Log `rowSelection` state
                </button>
            </div>
            <div>
                <button
                    className="border rounded p-2 mb-2"
                    onClick={() =>
                        console.info(
                            "table.getSelectedFlatRows()",
                            table.getSelectedRowModel().flatRows
                        )
                    }
                >
                    Log table.getSelectedFlatRows()
                </button>
            </div>
        </div>
    );
}

function Filter({ column, table }) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    return typeof firstValue === "number" ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={column.getFilterValue()?.[0] ?? ""}
                onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={column.getFilterValue()?.[1] ?? ""}
                onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            type="text"
            value={column.getFilterValue() ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    );
}

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return <input type="checkbox" ref={ref} className={className + " cursor-pointer"} {...rest} />;
}
