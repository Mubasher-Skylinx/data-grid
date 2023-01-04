import React from "react";
import DataGridContainer from "./DataGridContainer";
import data from "../../data/data";

function CustomTable() {
    const headersToInclude = [
        // "id",
        "name",
        "email",
        "phone",
        "url",
        "group",
        "address",
        "zip",
        "city",
        "state",
    ];
    return <DataGridContainer columns={headersToInclude} rows={data} />;
}

export default CustomTable;
