import React from "react";
import data from "./data/data";
import DataGridContainer from "./components/DataGridContainer";

function App() {
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

    // const headers = Object.keys(data[0]).filter();
    return (
        <section>
            <DataGridContainer
                // columns={headers}
                columns={headersToInclude}
                rows={data}
            />
        </section>
    );
}

export default App;
