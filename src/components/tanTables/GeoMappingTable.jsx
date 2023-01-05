import React, { useState } from "react";
import customData from "../../data/data";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

function GeoMappingTable() {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.email, {
            id: "email",
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Email</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("phone", {
            header: () => "Phone",
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("url", {
            header: () => <span>Url</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("address", {
            header: "Address",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("city", {
            header: "City",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("state", {
            header: "State",
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("zip", {
            header: "Zip",
            footer: (info) => info.column.id,
        }),
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

export default GeoMappingTable;
