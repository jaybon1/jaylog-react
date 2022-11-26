import MyNavbar from "components/commons/MyNavbar";
import React from "react";

const CommonLayout = ({ children, isNavbar }) => {
  return (
    <div>
      {isNavbar ? <MyNavbar /> : null}
      {children}
    </div>
  );
};

export default CommonLayout;
