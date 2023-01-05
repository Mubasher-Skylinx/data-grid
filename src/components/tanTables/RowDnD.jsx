import React from "react";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { makeData } from "../../data/makeData";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

const DraggableRow = ({ row, reorderRow }) => {
    const [, dropRef] = useDrop({
        accept: "row",
        drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => row,
        type: "row",
    });

    return (
        <tr
            ref={previewRef} //previewRef could go here
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <td ref={dropRef}>
                <button ref={dragRef}>🟰</button>
            </td>
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
        </tr>
    );
};

export default function RowDnD() {
    const [columns] = React.useState(() => [...defaultColumns]);
    const [data, setData] = React.useState(() => makeData(20));

    const reorderRow = (draggedRowIndex, targetRowIndex) => {
        data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
        setData([...data]);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-2">
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                <th />
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
                            <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
                        ))}
                    </tbody>
                </table>
            </div>
        </DndProvider>
    );
}
