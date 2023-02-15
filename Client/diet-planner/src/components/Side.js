import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";

import { AiFillPieChart } from "react-icons/ai";
const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } dark:bg-gradient-to-l from-[#FF7B54]  to-[#FFB26B] h-screen p-5  pt-8 relative duration-300`}
      >
        <BsArrowLeftShort
          size={30}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-black origin-left font-bold  text-xl duration-200 ${
              !open && "scale-0 hidden"
            }`}
          >
            Diet Planner
          </h1>
        </div>
        <ul className="pt-6">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
              >
                <RiDashboardFill size={25} className="text-black" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 ml-2`}
                >
                  Prepare Diet
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-black hover:bg-white dark:hover:bg-white"
              >
                <BsFillCheckSquareFill size={20} className="text-black" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left flex-1 ml-3 whitespace-nowrap duration-200`}
                >
                  Favorites
                </span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-black bg-black rounded-full dark:bg-black dark:text-white`}
                >
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-black hover:bg-gray-100 dark:hover:bg-white"
              >
                <AiFillPieChart size={25} className="text-black" />
                <span
                  className={`flex-1 ml-3 whitespace- ${
                    !open && "hidden"
                  } origin-left duration-200 `}
                >
                  Analytics
                </span>
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
export default App;
