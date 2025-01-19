import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Table from "./Components/Table";

function App() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year] = useState<number>(new Date().getFullYear());
  const printTable = () => {
    window.print();
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-between items-center gap-4 mb-4 font-semibold print:hidden w-[60%] max-sm:w-full sm:max-xl:w-full max-sm:px-5 sm:max-xl:px-5">
          <label>
            Month:
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="ml-2 border border-gray-300 px-3 py-2 rounded"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-center mt-5">
            <button
              onClick={printTable}
              className="bg-blue-500 text-white px-4 py-2 rounded-md "
            >
              Print
            </button>
          </div>
        </div>
      </div>
      <Table month={month} year={year} />
    </div>
  );
}

export default App;
