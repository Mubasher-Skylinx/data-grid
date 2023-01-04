import React from "react";
import "./dataGridTable.css";

function DataGridTable(props) {
    const { columns, rows, nullValue } = props;
    console.log(rows);
    return (
        <section className="table">
            {columns.map((col) => {
                return (
                    <h4 key={col} className="table-header-val">
                        {col}
                    </h4>
                );
            })}

            {rows?.map((data, i) => {
                return (
                    <article key={data.id} className="table-row">
                        {columns.map((col) => {
                            return (
                                <p className="table-row-value" key={data.id + col}>
                                    {data[col] || nullValue || "---"}
                                </p>
                            );
                        })}
                    </article>
                );
            })}
        </section>
    );
}

export default DataGridTable;
