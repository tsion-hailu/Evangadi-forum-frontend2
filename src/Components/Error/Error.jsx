import React from "react";

function Error({ message }) {
  return (
    <div
      style={{
        color: "red",
        margin: "3px",
        paddingLeft: "40px",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

export default Error;
