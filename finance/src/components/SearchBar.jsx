import React from "react";
// import useStore from "../store/useStore";
import { useStore } from "../store/useStore";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useStore();

  return (
    <input
      type="text"
      placeholder="Search by category..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded w-full md:w-64"
    />
  );
};

export default SearchBar;