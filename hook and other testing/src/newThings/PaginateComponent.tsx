import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchEmployee } from "../api";


function Items(props: { currentItems: any }) {
  return (
    <>
      {props.currentItems &&
        props.currentItems.map((item: any) => (
          <div key={item.id}>
            <h3>Item #{item.name}</h3>
          </div>
        ))}
    </>
  );
}

function PaginateComponent(props: { itemsPerPage: number }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["todos1", { pageNumber }],
    queryFn: () => fetchEmployee(pageNumber,props.itemsPerPage),
  });
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
   const pageCount = data ? Math.ceil(data[0].count / props.itemsPerPage):0;

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newPage = (event.selected +1);
    setPageNumber(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Items currentItems={data} />
      <nav className="mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        forcePage={pageNumber-1}
        />
      </nav>
    </>
  );
}

export default PaginateComponent;
