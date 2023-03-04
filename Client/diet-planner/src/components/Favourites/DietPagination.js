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
          className="lg:mt-12 lg:mb-16 mt-8  justify-center lg:right-0 grid lg:grid-cols-8"
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
