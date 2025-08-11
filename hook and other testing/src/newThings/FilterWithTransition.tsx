import React, { useState, useTransition, useMemo } from "react";

const ITEMS_COUNT = 100000; // A large number of items to simulate performance issues
const allItems = Array.from({ length: ITEMS_COUNT }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

function FilterWithTransition() {
  const [inputValue, setInputValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [isPending, startTransition] = useTransition(); // Initialize useTransition

  const handleChange = (e: any) => {
    setInputValue(e.target.value); // This is an urgent update, updates immediately
    startTransition(() => {
      // This is a non-urgent update, it can be interrupted
      setFilterQuery(e.target.value);
    });
  };

  const filteredItems = useMemo(() => {
    if (!filterQuery) {
      return allItems.slice(0, 100); // Show a subset for initial render
    }
    // Simulate a heavy filtering operation
    console.log("Filtering (with transition)...");
    return allItems
      .filter((item) =>
        item.name.toLowerCase().includes(filterQuery.toLowerCase())
      )
      .slice(0, 100); // Limit results for display
  }, [filterQuery]);

  return (
    <div style={{ border: "1px solid green", padding: "20px" }}>
      <h2>With useTransition</h2>
      <p>Type quickly and observe a smoother UI (input feels responsive).</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Filter items..."
        style={{ width: "300px", padding: "8px" }}
      />
      {isPending && (
        <div style={{ color: "blue", marginTop: "5px" }}>Filtering...</div>
      )}
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

export default FilterWithTransition;
