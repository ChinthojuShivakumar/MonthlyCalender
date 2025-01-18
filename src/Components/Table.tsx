import PropTypes from "prop-types";
import React from "react";

interface TableProps {
  month: number;
  year: number;
}

const Table: React.FC<TableProps> = ({ month, year }) => {
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const getDaysInMonth = (month: number, year: number): number => {
    const date = new Date(year, month + 1, 0); //get last day of current month
    return date.getDate();
  };
  // Get the number of days in the selected month
  const daysInMonth = getDaysInMonth(month, year);

  const firstHalfDays = Array.from(
    { length: Math.floor(daysInMonth / 2) },
    (_, index) => index + 1
  );

  const secondHalfDays = Array.from(
    { length: Math.floor(daysInMonth - firstHalfDays.length) },
    (_, index) => index + firstHalfDays.length + 1
  );

  const formatDate = (date: Date): string => {
    // Check if the date is valid
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return ""; // Return empty string if the date is invalid
  };
  return (
    <div className="w-full flex justify-center items-center font-semibold">
      <div className="w-[60%] flex flex-col justify-start items-center border-2 rounded-lg  shadow-xl print:w-full print:shadow-none">
        <div className="w-full text-center mt-5 font-bold text-4xl">
          <h1>
            {monthName}-{year}
          </h1>
        </div>
        <div className="w-full px-10 mt-5 print:px-2">
          <table className="w-full print:w-full">
            <thead className="w-full">
              <tr className="w-full">
                <th className="border-2 border-black px-10 py-3">Date</th>
                <th className="border-2 border-black px-10 py-3">Notes</th>
                <th className="border-2 border-black px-10 py-3">Date</th>
                <th className="border-2 border-black px-10 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(
                {
                  length: Math.max(firstHalfDays.length, secondHalfDays.length),
                },
                (_, index) => {
                  const date1 = new Date(year, month, firstHalfDays[index]);
                  const date2 = new Date(year, month, secondHalfDays[index]);
                  const isSunday1 = date1.getDay() === 0;
                  const isSunday2 = date2.getDay() === 0;
                  return (
                    <tr key={index}>
                      {/* First column */}
                      <td
                        className={`border-2 border-black px-5 py-3 ${
                          isSunday1 ? "text-red-500" : ""
                        }`}
                      >
                        {date1 ? (
                          <>
                            <p>{formatDate(date1)}</p>
                            <p>
                              {date1.toLocaleString("default", {
                                weekday: "long",
                              })}
                            </p>
                          </>
                        ) : null}
                      </td>
                      <td className="border-2 border-black px-10 py-3 w-96"></td>

                      {/* Second column */}
                      <td
                        className={`border-2 border-black px-5 py-3 ${
                          isSunday2 ? "text-red-500" : ""
                        }`}
                      >
                        {date2 ? (
                          <>
                            <p>{formatDate(date2)}</p>
                            <p>
                              {date2.toLocaleString("default", {
                                weekday: "long",
                              })}
                            </p>
                          </>
                        ) : null}
                      </td>
                      <td className="border-2 border-black px-10 py-3 w-96"></td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  month: PropTypes.any,
};

export default Table;
