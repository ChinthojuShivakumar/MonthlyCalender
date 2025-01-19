import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TableProps {
  month: number;
  year: number;
}

const Table: React.FC<TableProps> = ({ month, year }) => {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("calendarNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
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
    setNotes((prev) => {
      const updatedNotes = { ...prev };
      if (value.trim() === "") {
        delete updatedNotes[date]; // Remove the date key if the value is empty
      } else {
        updatedNotes[date] = value; // Otherwise, update the note
      }
      return updatedNotes;
    });
  };

  const saveNotes = () => {
    localStorage.setItem("calendarNotes", JSON.stringify(notes));
    alert("Notes saved successfully!");
  };

  // Split the days into two halves (first and second half of the month)
  const firstHalfDays = Array.from({ length: Math.ceil(daysInMonth / 2) }, (_, i) => i + 1);
  const secondHalfDays = Array.from({ length: Math.floor(daysInMonth / 2) }, (_, i) => i + Math.ceil(daysInMonth / 2) + 1);

  return (
    <div className="w-full flex justify-center items-center font-semibold">
      <div className="w-[90%] lg:w-[70%] flex flex-col justify-start items-center border-2 rounded-lg shadow-xl print:w-full print:shadow-none">
        <div className="w-full text-center mt-5 font-bold text-2xl md:text-4xl">
          <h1>
            {monthName} - {year}
          </h1>
        </div>
        {/* Save Button */}
        <div className="w-full flex justify-end px-4 md:px-10 mt-5 gap-5 print:hidden">
          <button
            onClick={saveNotes}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Notes
          </button>
          <button
            onClick={() => navigate("/view")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            View Notes
          </button>
        </div>

        {/* Single Table with Two Columns for the Month */}
        <div className="w-full px-4 md:px-10 mt-5 print:px-2">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr>
                <th className="border-2 border-black px-4 py-2">Date</th>
                <th className="border-2 border-black px-4 py-2">Note</th>
                <th className="border-2 border-black px-4 py-2">Date</th>
                <th className="border-2 border-black px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {/* Combine both halves into one table */}
              {Array.from({ length: Math.max(firstHalfDays.length, secondHalfDays.length) }, (_, i) => (
                <tr key={i}>
                  {/* First Half */}
                  <td
                    className={`border-2 border-black px-4 py-2 ${
                      firstHalfDays[i] && new Date(year, month, firstHalfDays[i]).getDay() === 0 ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    {firstHalfDays[i] && (
                      <>
                        <p>{new Date(year, month, firstHalfDays[i]).toLocaleString("default", { weekday: "long" })}</p>
                        <p>{formatDate(month, firstHalfDays[i], year)}</p>
                      </>
                    )}
                  </td>
                  <td className="border-2 border-black px-4 py-2">
                    {firstHalfDays[i] && (
                      <textarea
                        value={notes[formatDate(month, firstHalfDays[i], year)] || ""}
                        onChange={(e) => handleNoteChange(formatDate(month, firstHalfDays[i], year), e.target.value)}
                        className="w-full px-2 py-1 border rounded resize-none h-16"
                        placeholder=""
                      />
                    )}
                  </td>

                  {/* Second Half */}
                  <td
                    className={`border-2 border-black px-4 py-2 ${
                      secondHalfDays[i] && new Date(year, month, secondHalfDays[i]).getDay() === 0 ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    {secondHalfDays[i] && (
                      <>
                        <p>{new Date(year, month, secondHalfDays[i]).toLocaleString("default", { weekday: "long" })}</p>
                        <p>{formatDate(month, secondHalfDays[i], year)}</p>
                      </>
                    )}
                  </td>
                  <td className="border-2 border-black px-4 py-2">
                    {secondHalfDays[i] && (
                      <textarea
                        value={notes[formatDate(month, secondHalfDays[i], year)] || ""}
                        onChange={(e) => handleNoteChange(formatDate(month, secondHalfDays[i], year), e.target.value)}
                        className="w-full px-2 py-1 border rounded resize-none h-16"
                        placeholder=""
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
