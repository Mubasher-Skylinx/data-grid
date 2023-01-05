import React, { useState } from "react";
import customData from "../../data/data";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

function GeoMappingTable2() {
    const columns = [
        {
            header: () => <span>Name</span>,
            accessorKey: "name",
        },
        {
            accessorKey: "email",
            header: () => <span>Email</span>,
        },
        {
            accessorKey: "phone",
            header: () => <span>Phone No</span>,
        },
        {
            accessorKey: "url",
            header: () => <span>URL</span>,
        },
        {
            accessorKey: "address",
            header: () => <span>Address</span>,
        },
        {
            accessorKey: "city",
            header: () => <span>City</span>,
        },
        {
            accessorKey: "state",
            header: () => <span>State</span>,
        },
        {
            accessorKey: "zip",
            header: () => <span>Zip</span>,
        },
    ];

    const [data, setData] = useState(() => [...customData]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className="app-container">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
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

                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </section>
    );
}

export default GeoMappingTable2;
