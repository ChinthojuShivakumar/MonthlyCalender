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
  }, []);

  // Save notes to localStorage
  const saveNotes = () => {
    localStorage.setItem("calendarNotes", JSON.stringify(notes));
    alert("Notes saved successfully!");
  };

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(month, year);

  const handleNoteChange = (date: string, value: string) => {
    setNotes((prev) => ({ ...prev, [date]: value }));
  };

  const formatDate = (day: number): string => {
    const date = new Date(year, month, day);
    const dayStr = String(date.getDate()).padStart(2, "0");
    const monthStr = String(date.getMonth() + 1).padStart(2, "0");
    return `${dayStr}/${monthStr}/${year}`;
  };

  return (
    <div className="w-full flex justify-center items-center font-semibold">
      <div className="w-[90%] lg:w-[70%] flex flex-col justify-start items-center border-2 rounded-lg shadow-xl print:w-full print:shadow-none">
        {/* Header */}
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
                <th className="border-2 border-black px-2 md:px-4 py-2">
                  Date
                </th>
                <th className="border-2 border-black px-2 md:px-4 py-2">Day</th>
                <th className="border-2 border-black px-2 md:px-4 py-2">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const dateKey = formatDate(day);
                const date = new Date(year, month, day);
                const isSunday = date.getDay() === 0; // Sunday check
                const dayName = date.toLocaleString("default", {
                  weekday: "long",
                });

                return (
                  <tr key={index}>
                    {/* Date Column */}
                    <td
                      className={`border-2 border-black px-2 md:px-4 py-2 ${
                        isSunday ? "text-red-500 font-bold" : ""
                      }`}
                    >
                      {dateKey}
                    </td>

                    {/* Day Name Column */}
                    <td
                      className={`border-2 border-black px-2 md:px-4 py-2 ${
                        isSunday ? "text-red-500 font-bold" : ""
                      }`}
                    >
                      {dayName}
                    </td>

                    {/* Note Input Column */}
                    <td className="border-2 border-black px-2 md:px-4 py-2">
                      <input
                        type="text"
                        value={notes[dateKey] || ""}
                        onChange={(e) =>
                          handleNoteChange(dateKey, e.target.value)
                        }
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
