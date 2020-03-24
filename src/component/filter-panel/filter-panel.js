import React, { Component } from "react";
import "./filter-panel.css";

const filterButtons = [
  { name: "all", label: "All" },
  { name: "active", label: "active" },
  { name: "important", label: "important" },
  { name: "done", label: "Done" },
];
const ItemStatusFilter = ({ filter, onFilterChange = () => {} }) => {
  const buttons = filterButtons.map(({ name, label }) => {
    const activeBtn = name === filter;
    const classNames = "btn " + (activeBtn ? "btn-active active" : "none");

    return (
      <button
        key={name}
        type="button"
        onClick={() => onFilterChange(name)}
        className={classNames}
      >
        {label}
      </button>
    );
  });

  return (
    <div className="btn-panel">
      <div className="btn-group ">{buttons}</div>
    </div>
  );
};

export default ItemStatusFilter;
