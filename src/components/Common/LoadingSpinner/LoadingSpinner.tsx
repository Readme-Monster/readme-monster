import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-10 h-10 animate-spin">
      <img src="/images/rm-logo.png" className="loading--cycle"></img>
    </div>
  );
};

export default LoadingSpinner;
