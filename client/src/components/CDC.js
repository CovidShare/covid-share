import React from "react";
import "../styles/CDC.css";
const CDC = (props) => {
  return (
    <div
      className="map"
      data-post-id="50079"
      data-site-id="499"
      data-site-root-folder="coronavirus"
      class="mb-3"
      data-host="www.cdc.gov"
      data-theme="theme-cyan"
      data-cdc-widget="cdcMaps"
      data-config-url="/coronavirus/2019-ncov/cases-updates/us-case-count-maps-charts/map-cases-us-CaseOnly_Desktop.json"
    ></div>
  );
};

export default CDC;
