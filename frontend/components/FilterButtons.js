import React from "react";
import PropTypes from "prop-types";

function FilterButtons({ currentFilter, onFilterChange }) {
  // console.log("FilterButtons render");

  return (
    <div className="filter-buttons">
      <button
        className="filter-btn"
        onClick={() => onFilterChange("all")}
        disabled={currentFilter === "all"}
      >
        Все
      </button>
      <button
        className="filter-btn"
        onClick={() => onFilterChange("active")}
        disabled={currentFilter === "active"}
      >
        Активные
      </button>
      <button
        className="filter-btn"
        onClick={() => onFilterChange("blocked")}
        disabled={currentFilter === "blocked"}
      >
        Заблокированные
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterButtons;
