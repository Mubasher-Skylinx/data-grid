import React, { useState } from "react";
import { faker } from "@faker-js/faker";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { makeData } from "../../data/makeData";

const defaultColumns = [
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
];

function ColumnToggeling() {
    const [data, setData] = useState(() => makeData(20));
    const [columns] = useState(() => [...defaultColumns]);

    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);

    const rerender = () => setData(() => makeData(20));

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            columnOrder,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <div className="p-2">
            <div className="inline-block border border-black shadow rounded">
                <div className="px-1 border-b border-black">
                    <label>
                        <input
                            {...{
                                type: "checkbox",
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{" "}
                        Toggle All
                    </label>
                </div>
                {table.getAllLeafColumns().map((column) => {
                    return (
                        <div key={column.id} className="px-1">
                            <label>
                                <input
                                    {...{
                                        type: "checkbox",
                                        checked: column.getIsVisible(),
                                        onChange: column.getToggleVisibilityHandler(),
                                    }}
                                />{" "}
                                {column.id}
                            </label>
                        </div>
                    );
                })}
            </div>

            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre> */}
        </div>
    );
}

export default ColumnToggeling;
