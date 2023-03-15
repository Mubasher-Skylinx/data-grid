import React, { useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { makeData } from "../../data/makeData";

export default function SortingData() {
    const [sorting, setSorting] = useState([]);

    const columns = useMemo(
        () => [
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

    const [data, setData] = useState(() => makeData(1000));

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
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
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[header.column.getIsSorted()] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
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
        </div>
    );
}
