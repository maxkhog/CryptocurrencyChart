import React from "react";

export const Loader:React.FC = () => {
  return (
    <div className="loadingContainer">
      <div className="loadingBg"></div>
      <div className="lds">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

