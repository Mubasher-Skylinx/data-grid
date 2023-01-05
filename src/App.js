import React, { useState } from "react";
import CustomTable from "./components/customTable/CustomTable";
import BasicExample from "./components/tanTables/Basic-Example";
import GeoMappingTable from "./components/tanTables/GeoMappingTable";
import GeoMappingTable1 from "./components/tanTables/GeoMappingTable-1";
import GeoMappingTable2 from "./components/tanTables/GeoMappingTable-2";
import GeoMappingTable3 from "./components/tanTables/GeoMappingTable-3";
import GeoMappingTable4 from "./components/tanTables/GeoMappingTable-4";

function App() {
    return (
        <section className="app-container">
            {/* <CustomTable /> */}
            {/* <BasicExample /> */}
            {/* <GeoMappingTable /> */}
            {/* <GeoMappingTable1 /> */}
            {/* <GeoMappingTable2 /> */}
            {/* <GeoMappingTable3 /> */}
            <GeoMappingTable4 />
        </section>
    );
}

export default App;
