import React, { useState } from "react";
import Pagination from "./Pagination";

const MyComponent = () => {
  const itemsPerPage = 10; // You can adjust the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Your list of items
  const itemList = [
    // Your list of items goes here
    // Example: { id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }, ...
  ];

  // Calculate the total number of pages based on the items and itemsPerPage
  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  // Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Display the current page's items */}
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Display the pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MyComponent;
