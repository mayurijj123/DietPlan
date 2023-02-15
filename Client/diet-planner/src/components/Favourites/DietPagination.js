import React from "react";
import Posts from "./DietPost";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {
  return (
    <div className="py-2">
      <nav className="block"></nav>
      <div>
        <nav
          className="mt-12 mb-16 right-0 grid grid-cols-8"
          aria-label="Pagination"
        >
          <a
            onClick={() => {
              paginateBack();
            }}
            href="#"
            className="bg-gray-300 col-span-1 col-start-7 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            <span>Previous</span>
          </a>

          <a
            onClick={() => {
              paginateFront();
            }}
            href="#"
            className="bg-gray-300 col-span-1 col-start-8 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            <span>Next</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
