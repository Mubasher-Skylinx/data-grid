import React, { useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DndProvider, useDrag, useDrop } from "react-dnd";

import { makeData } from "../../data/makeData";
import { HTML5Backend } from "react-dnd-html5-backend";

const defaultColumns = [
    {
        id: "firstName",
        header: "First Name",
        accessorKey: "firstName",
    },
    {
        id: "lastName",
        header: "lastName",
        accessorKey: "lastName",
    },
    {
        id: "age",
        header: "Age",
        accessorKey: "age",
    },

    {
        id: "visits",
        header: "Visits",
        accessorKey: "visits",
    },
    {
        id: "status",
        header: "Status",
        accessorKey: "status",
    },
    {
        id: "progress",
        header: "Profile Progress",
        accessorKey: "progress",
    },
];

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );
    return [...columnOrder];
};

const DraggableColumnHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table;
    const { columnOrder } = getState();
    const { column } = header;

    const [, dropRef] = useDrop({
        accept: "column",
        drop: (draggedColumn) => {
            const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
            setColumnOrder(newColumnOrder);
        },
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: "column",
    });

    return (
        <th ref={dropRef} colSpan={header.colSpan} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div ref={previewRef}>
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                <button ref={dragRef}>🟰</button>
            </div>
        </th>
    );
};

export default function ColumnDnD() {
    const [data, setData] = useState(() => makeData(20));
    const [columns] = useState(() => [...defaultColumns]);

    const [columnOrder, setColumnOrder] = useState(
        columns.map((column) => column.id) //must start out with populated columnOrder so we can splice
    );

    const resetOrder = () => setColumnOrder(columns.map((column) => column.id));

    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-2">
                <div className="h-4" />
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => resetOrder()} className="border p-1">
                        Reset Order
                    </button>
                </div>

                <div className="h-4" />
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <DraggableColumnHeader
                                        key={header.id}
                                        header={header}
                                        table={table}
                                    />
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
        </DndProvider>
    );
}
