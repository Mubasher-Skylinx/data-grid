import React, { useState } from "react";
import CustomTable from "./components/customTable/CustomTable";
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

function App() {
    return (
        <section className="app-container">
            {/* <CustomTable /> */}
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
            {/* <ColumnFilterable /> */}
            {/* <ColumnFilterableEditable /> */}
            {/* <ColumnExpandable /> */}
            {/* <RowDnD /> */}
            <RowSelectable />
        </section>
    );
}

export default App;
