import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const ViewNotes: React.FC = () => {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = localStorage.getItem("calendarNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Group notes by month
  const groupedNotes: {
    [monthYear: string]: { date: string; note: string }[];
  } = {};

  Object.entries(notes).forEach(([date, note]) => {
    // Split date and validate format
    const dateParts = date.split("/");
    if (dateParts.length === 3) {
      const [, month, year] = dateParts;
      const monthYear = `${new Date(
        Number(year),
        Number(month) - 1
      ).toLocaleString("default", {
        month: "long",
      })} ${year}`;

      if (!groupedNotes[monthYear]) {
        groupedNotes[monthYear] = [];
      }

      groupedNotes[monthYear].push({ date, note });
    }
  });

  const printTable = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center font-semibold">
      <Navbar />
      <div className="w-[90%] mt-10 lg:w-[70%] flex flex-col justify-start items-center border-2 rounded-lg shadow-xl">
        <div className="flex justify-end mt-5 w-full pr-5">
          <button
            onClick={printTable}
            className="bg-blue-500 text-white px-4 py-2 rounded-md float-end"
          >
            Print
          </button>
        </div>
        <div className="w-full text-center mt-5 font-bold text-2xl md:text-4xl">
          <h1>Saved Notes</h1>
        </div>

        {/* View saved notes */}
        <div className="w-full px-4 md:px-10 mt-5">
          {Object.keys(groupedNotes).length === 0 ? (
            <p>No notes saved yet.</p>
          ) : (
            Object.entries(groupedNotes).map(([monthYear, notes]) => (
              <div key={monthYear} className="mb-6">
                {/* Month name */}
                <h2 className="text-lg md:text-xl font-bold mb-4">
                  {monthYear}
                </h2>
                <ul className="list-disc pl-5">
                  {notes.map(({ date, note }, index) => {
                    const [day, month, year] = date.split("/");
                    const dateObj = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day)
                    );
                    const dayName = dateObj.toLocaleString("default", {
                      weekday: "long",
                    });
                    const isSunday = dateObj.getDay() === 0; // Sunday check
                    return (
                      <li
                        key={index}
                        className={`mb-2 ${isSunday ? "text-red-500" : ""}`}
                      >
                        <strong>
                          {date} ({dayName}):
                        </strong>{" "}
                        {note}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
