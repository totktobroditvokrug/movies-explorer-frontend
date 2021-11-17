import React from "react";
import "./NavTab.css";

function NavTab({ value }) {
  return <button className="navtab_button"><a href="#profile">{value}</a></button>;
}

export default NavTab;
