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

export default function ColumnGrouping() {
    const [data, setData] = useState(() => makeData(20)); //PASS SECOND ARGUMENT FOR NESTED DATA;
    const [columns] = useState(() => [...defaultColumns]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
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
        </div>
    );
}
