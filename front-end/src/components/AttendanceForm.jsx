import React, { useState } from "react";

// Fake data directly in the file (No external imports)
const branches = [
  { id: 1, name: "نمایندگی کابل" },
  { id: 2, name: "نمایندگی هرات" },
];

const employees = [
  {
    id: 1,
    name: "احمد",
    position: "ولدر",
    branch_id: 1,
    presentDays: 24,
    totalDays: 27,
  },
  {
    id: 2,
    name: "محمود",
    position: "تخنیکر",
    branch_id: 1,
    presentDays: 27,
    totalDays: 27,
  },
  {
    id: 3,
    name: "کریم",
    position: "اپرایتور",
    branch_id: 2,
    presentDays: 20,
    totalDays: 27,
  },
];

export default function AttendanceForm() {
  // Logic: Get today's date in YYYY-MM-DD format for the default value
  const today = new Date().toISOString().split("T")[0];

  // States to hold the user's choices
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedBranch, setSelectedBranch] = useState("");

  // Logic Fix: Return [] (empty array) if no branch is selected.
  // It only filters employees if a branch is actually chosen.
  const filteredEmployees = selectedBranch
    ? employees.filter((emp) => emp.branch_id === parseInt(selectedBranch))
    : [];

  // Custom Dropdown Arrow for professional UI
  const DropdownArrow = () => (
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  );

  return (
    <div
      className="bg-white p-6 rounded-lg shadow max-w-7xl mx-auto my-10"
      dir="rtl"
    >
      {/* Header Controls: Branch and Date */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded border">
        {/* Branch Selector */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <label className="font-bold text-gray-700">نمایندگی:</label>
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 p-2 rounded-lg bg-white text-gray-700 w-56 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] cursor-pointer transition-all"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">انتخاب نمایندگی...</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <DropdownArrow />
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <label className="font-bold text-gray-700">تاریخ:</label>
          <input
            type="date"
            className="appearance-none border border-gray-300 p-2 rounded-lg bg-white text-gray-700 w-48 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] transition-all cursor-pointer"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b text-slate-600">
            <th className="p-3">نام کارمند</th>
            <th className="p-3">وظیفه</th>
            <th className="p-3 text-center">حالت</th>
            <th className="p-3 text-center">مجموع حاضری ماه</th>
            <th className="p-3 text-center">روز های حاضر</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr
              key={emp.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 font-medium text-gray-800">{emp.name}</td>
              <td className="p-3 text-gray-600">{emp.position}</td>
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#8c2e25] text-[#8c2e25] cursor-pointer rounded border-gray-300 focus:ring-[#8c2e25]"
                />
              </td>
              <td
                className="py-3 text-center text-gray-600 font-semibold"
                dir="ltr"
              >
                {emp.totalDays}
              </td>
              <td
                className="py-3 text-center text-gray-600 font-semibold"
                dir="ltr"
              >
                {emp.presentDays}
              </td>
            </tr>
          ))}

          {/* Message if no employees are found (array is empty) */}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                لطفاً یک نمایندگی را انتخاب کنید تا لیست کارمندان نمایش داده
                شود.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6 border-t pt-4 border-gray-100">
        <button className="bg-[#8c2e25] text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-[#5a1f1a] hover:shadow-lg transition-all focus:ring-4 focus:ring-[#8c2e25]">
          ذخیره حاضری
        </button>
      </div>
    </div>
  );
}
