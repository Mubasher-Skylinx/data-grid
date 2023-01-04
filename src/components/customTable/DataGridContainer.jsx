import React from "react";
import DataGridTable from "./DataGridTable";

// import "./dataGridContainer.css";

function DataGridContainer(props) {
    const { columns, rows, nullValue } = props;

    const handleRowEdit = (id) => {};
    const handleRowDelete = (id) => {};

    const handleColumnEdit = (id) => {};
    const handleColumnDelete = (id) => {};

    return (
        <section className="table-container">
            <DataGridTable columns={columns} rows={rows} nullValue={nullValue} />
        </section>
    );
}

export default DataGridContainer;
