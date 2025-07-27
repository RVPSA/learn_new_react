import React, { useState, useMemo } from "react";

const ITEMS_COUNT = 100000; // A large number of items to simulate performance issues
const allItems = Array.from({ length: ITEMS_COUNT }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

function FilterWithoutTransition() {
  const [inputValue, setInputValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  // This function is called on every input change, directly updating filterQuery
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    setFilterQuery(e.target.value); // Direct update, potentially blocking UI
  };

  const filteredItems = useMemo(() => {
    if (!filterQuery) {
      return allItems.slice(0, 100); // Show a subset for initial render
    }
    // Simulate a heavy filtering operation
    console.log("Filtering (without transition)...");
    return allItems
      .filter((item) =>
        item.name.toLowerCase().includes(filterQuery.toLowerCase())
      )
      .slice(0, 100); // Limit results for display
  }, [filterQuery]);

  return (
    <div
      style={{ border: "1px solid red", padding: "20px", marginBottom: "20px" }}
    >
      <h2>Without useTransition</h2>
      <p>Type quickly and observe potential UI jank (input lag).</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Filter items..."
        style={{ width: "300px", padding: "8px" }}
      />
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          marginTop: "10px",
          border: "1px solid #ccc",
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{ padding: "4px", borderBottom: "1px dotted #eee" }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterWithoutTransition;
