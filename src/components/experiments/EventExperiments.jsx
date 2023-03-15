import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const defaultColumn = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
        let value = getValue();
        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
            table.options.meta?.updateData(index, id, value);
        };

        return (
            <input
                defaultValue={value}
                onChange={(e) => {
                    value = e.target.value;
                }}
                onBlur={onBlur}
            />
        );
    },
};

export default function EventExperiment(props) {
    const columns = useMemo(
        () =>
            props.columns.map((col) => ({
                accessorKey: col,
            })),
        []
    );

    // const [data, setData] = useState(() => makeData(1000));
    const [data, setData] = useState(() => props.data);

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        // Provide our updateData function to our table meta
        meta: {
            updateData: (rowIndex, columnId, value) => {
                // Skip age index reset until after next rerender
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
        },
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
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
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
        </div>
    );
}
