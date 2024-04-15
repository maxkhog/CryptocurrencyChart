import React from "react";

const Loader:React.FC = () => {
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

export default Loader;
