import React from "react";
import "./dataGridTable.css";

function DataGridTable(props) {
    const { columns, rows, nullValue } = props;

    return (
        <section className="table">
            <section className="table-header">
                {columns.map((col) => {
                    return <h4 key={col}>{col}</h4>;
                })}
            </section>

            <section className="table-body">
                {rows?.map((data, i) => {
                    return (
                        <article className="table-row" key={data.id || i}>
                            <p>{data?.name || nullValue || "---"}</p>
                            <p>{data?.email || nullValue || "---"}</p>
                            <p>{data?.phone || nullValue || "---"}</p>
                            <p>{data?.url || nullValue || "---"}</p>
                            <p>{data?.group || nullValue || "---"}</p>
                            <p>{data?.address || nullValue || "---"}</p>
                            <p>{data?.zip || nullValue || "---"}</p>
                            <p>{data?.city || nullValue || "---"}</p>
                            <p>{data?.state || nullValue || "---"}</p>
                        </article>
                    );
                })}
            </section>
        </section>
    );
}

export default DataGridTable;
