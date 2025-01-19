import React, { useState, useEffect } from "react";

interface TableProps {
  month: number;
  year: number;
}

const Table: React.FC<TableProps> = ({ month, year }) => {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  // Load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("calendarNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }

    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    // Check if it's January 1st or July 1st
    if (currentMonth === 0 && currentDay === 1) {
      // Clear notes from January 1, 2023 to June 30, 2023
      const lastYear = currentYear - 1;
      const lastYearNotes = JSON.parse(localStorage.getItem("calendarNotes") || "{}");

      // Remove notes from the first half of last year (Jan-Jun)
      for (let month = 0; month < 6; month++) {
        for (let day = 1; day <= getDaysInMonth(month, lastYear); day++) {
          const dateKey = formatDate(month, day, lastYear);
          delete lastYearNotes[dateKey];
        }
      }

      // Save the updated notes to localStorage
      localStorage.setItem("calendarNotes", JSON.stringify(lastYearNotes));
      console.log("Notes cleared for January 1 - June 30 of last year!");
    }

    if (currentMonth === 6 && currentDay === 1) {
      // Clear notes from July 1, 2023 to December 31, 2023
      const lastYear = currentYear - 1;
      const lastYearNotes = JSON.parse(localStorage.getItem("calendarNotes") || "{}");

      // Remove notes from the second half of last year (Jul-Dec)
      for (let month = 6; month < 12; month++) {
        for (let day = 1; day <= getDaysInMonth(month, lastYear); day++) {
          const dateKey = formatDate(month, day, lastYear);
          delete lastYearNotes[dateKey];
        }
      }

      // Save the updated notes to localStorage
      localStorage.setItem("calendarNotes", JSON.stringify(lastYearNotes));
      console.log("Notes cleared for July 1 - December 31 of last year!");
    }
  }, []);

  // Get the number of days in a given month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Format the date for storage and display
  const formatDate = (month: number, day: number, year: number): string => {
    const dayStr = String(day).padStart(2, "0");
    const monthStr = String(month + 1).padStart(2, "0"); // Adjust for 0-indexed months
    return `${dayStr}/${monthStr}/${year}`;
  };

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = getDaysInMonth(month, year);

  const handleNoteChange = (date: string, value: string) => {
    setNotes((prev) => ({ ...prev, [date]: value }));
  };

  const saveNotes = () => {
    localStorage.setItem("calendarNotes", JSON.stringify(notes));
    alert("Notes saved successfully!");
  };

  return (
    <div className="w-full flex justify-center items-center font-semibold">
      <div className="w-[90%] lg:w-[70%] flex flex-col justify-start items-center border-2 rounded-lg shadow-xl print:w-full print:shadow-none">
        <div className="w-full text-center mt-5 font-bold text-2xl md:text-4xl">
          <h1>
            {monthName} - {year}
          </h1>
        </div>
          {/* Save Button */}
          <div className="w-full flex justify-end px-4 md:px-10 mt-5">
          <button
            onClick={saveNotes}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Notes
          </button>
        </div>

        {/* Table */}
        <div className="w-full px-4 md:px-10 mt-5 print:px-2">
          <table className="w-full print:w-full text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-2 border-black px-2 md:px-4 py-2">Date</th>
                <th className="border-2 border-black px-2 md:px-4 py-2">Day</th>
                <th className="border-2 border-black px-2 md:px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const dateKey = formatDate(month, day, year);
                const date = new Date(year, month, day);
                const isSunday = date.getDay() === 0; // Sunday check
                const dayName = date.toLocaleString("default", { weekday: "long" });

                return (
                  <tr key={index}>
                    <td
                      className={`border-2 border-black px-2 md:px-4 py-2 ${
                        isSunday ? "text-red-500 font-bold" : ""
                      }`}
                    >
                      {dateKey}
                    </td>
                    <td
                      className={`border-2 border-black px-2 md:px-4 py-2 ${
                        isSunday ? "text-red-500 font-bold" : ""
                      }`}
                    >
                      {dayName}
                    </td>
                    <td className="border-2 border-black px-2 md:px-4 py-2">
                      <input
                        type="text"
                        value={notes[dateKey] || ""}
                        onChange={(e) => handleNoteChange(dateKey, e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                        placeholder="Add a note..."
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      
      </div>
    </div>
  );
};

export default Table;
