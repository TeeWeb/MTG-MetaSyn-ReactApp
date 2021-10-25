import React from "react";
import SearchParams from "./SearchParams";

import "./GUI.css";

const GUI = ({ host, handleUpdateCards }) => {
  return (
    <div className="gui">
      <h1>MTG MetaSyn</h1>
      <SearchParams ENV_HOST={host} requestCards={handleUpdateCards()} />
    </div>
  );
};

export default GUI;
