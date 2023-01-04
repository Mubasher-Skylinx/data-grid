import React from "react";

function DataGridTable(props) {
    const { columns, rows, nullValue } = props;

    return (
        <table className="table shadow-soft mapData-tabular--table">
            <thead>
                <tr>
                    {columns.map((col) => {
                        return <th key={col}>{col}</th>;
                    })}
                </tr>
            </thead>

            <tbody>
                {rows?.map((data, i) => {
                    return (
                        <tr key={data.id}>
                            <td>{data?.name || nullValue || "---"}</td>
                            <td>{data?.email || nullValue || "---"}</td>
                            <td>{data?.phone || nullValue || "---"}</td>
                            <td>{data?.url || nullValue || "---"}</td>
                            <td>{data?.group || nullValue || "---"}</td>
                            <td>{data?.address || nullValue || "---"}</td>
                            <td>{data?.zip || nullValue || "---"}</td>
                            <td>{data?.city || nullValue || "---"}</td>
                            <td>{data?.state || nullValue || "---"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default DataGridTable;
