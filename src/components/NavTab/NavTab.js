import React from "react";
import "./NavTab.css";

function NavTab({ value }) {
  return <a href="#profile" className="navtab_button">{value}</a>;
}

export default NavTab;
