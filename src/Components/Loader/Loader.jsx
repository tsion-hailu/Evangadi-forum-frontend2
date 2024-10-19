import React from "react";
import { PulseLoader } from "react-spinners";
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "4vh",
      }}
    >
      <PulseLoader size={12} color="#6CB9F2" />
    </div>
  );
}

export default Loader;
