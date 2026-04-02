import React from "react";
//import useStore from "../store/useStore";
import { useStore } from "../store/useStore"; 

const Sort = () => {
  const { sortBy, setSortBy } = useStore();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setSortBy("amount")}
        className={`px-3 py-1 border rounded ${
          sortBy === "amount" ? "bg-blue-500 text-white" : ""
        }`}
      >
        Amount
      </button>
      <button
        onClick={() => setSortBy("date")}
        className={`px-3 py-1 border rounded ${
          sortBy === "date" ? "bg-blue-500 text-white" : ""
        }`}
      >
        Date
      </button>
    </div>
  );
};

export default Sort;