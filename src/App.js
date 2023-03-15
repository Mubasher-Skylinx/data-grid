import React, { useState } from "react";
import BasicExample from "./components/tanTables/BasicExample";
import GeoMappingTable from "./components/tanTables/GeoMappingTable";
import GeoMappingTable1 from "./components/tanTables/GeoMappingTable1";
import GeoMappingTable2 from "./components/tanTables/GeoMappingTable2";
import GeoMappingTable3 from "./components/tanTables/GeoMappingTable3";
import GeoMappingTable4 from "./components/tanTables/GeoMappingTable4";
import ColumnToggeling from "./components/tanTables/ColumnToggeling";
import ColumnGrouping from "./components/tanTables/ColumnGrouping";
import ColumnDnD from "./components/tanTables/ColumnDnD";
import ColumnEditable from "./components/tanTables/ColumnEditable";
import ColumnFilterable from "./components/tanTables/ColumnFilterable";
import ColumnFilterableEditable from "./components/tanTables/ColumnFilterableEditable";
import ColumnExpandable from "./components/tanTables/ColumnExpandable";
import RowDnD from "./components/tanTables/RowDnD";
import RowSelectable from "./components/tanTables/RowSelectable";
import SortingData from "./components/tanTables/SortingData";

import data from "./data/data";
import EventExperiment from "./components/experiments/EventExperiments";
import { filterHeaders } from "./utils/utils";
import ColumnPagination from "./components/tanTables/ColumnPagination";

function App() {
    let headers = filterHeaders(Object.keys(data[0]));

    return (
        <section className="app-container">
            {/* <EventExperiment data={data} columns={headers} /> */}

            {/* <BasicExample /> */}
            {/* <GeoMappingTable /> */}
            {/* <GeoMappingTable1 /> */}
            {/* <GeoMappingTable2 /> */}
            {/* <GeoMappingTable3 /> */}
            {/* <GeoMappingTable4 /> */}
            {/* <ColumnToggeling /> */}
            {/* <ColumnGrouping /> */}
            {/* <ColumnDnD /> */}
            {/* <ColumnEditable /> */}
            <ColumnPagination />
            {/* <ColumnFilterable /> */}
            {/* <ColumnFilterableEditable /> */}
            {/* <ColumnExpandable /> */}
            {/* <RowDnD /> */}
            {/* <RowSelectable /> */}
            {/* <SortingData /> */}
        </section>
    );
}

export default App;
