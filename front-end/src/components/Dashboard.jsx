import React from 'react';
import { products } from '../data/mockData';

// 1. Dashboard Page (Added Bar Chart)
export default function Dashboard() {
  // Logic to find the max produced item to scale the graph bars
  const maxProduced = Math.max(...products.map(p => p.produced));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        خلاصه سیستم (ماه جاری)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Production (Blue Theme - Multiple Nails/Wires) */}
        <div className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden transition hover:shadow-lg ">
          <div className="relative z-10">
            <h3 className="text-gray-500 text-sm font-bold">مجموع تولیدات</h3>
            <p className="text-3xl font-bold text-black mt-2">
              ۹,۷۰۰{" "}
              <span className="text-sm font-normal text-gray-400">کیلوگرم</span>
            </p>
          </div>

          {/* Cluster of Products (Nails & Wires) - All text-blue-100 */}
          <svg
            className="absolute -left-6 -bottom-6 w-32 h-32 text-gray-200 opacity-60 transform rotate-45"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 2h10v3H7z M11 5h2v14l-1 3-1-3z" />
          </svg>
          <svg
            className="absolute top-2 left-1/4 w-12 h-12 text-gray-200 opacity-70 transform -rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 2h10v3H7z M11 5h2v14l-1 3-1-3z" />
          </svg>

          <svg
            className="absolute -top-4 -right-4 w-20 h-20 text-gray-200 opacity-60 transform rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 2h10v3H7z M11 5h2v14l-1 3-1-3z" />
          </svg>
        </div>

        {/* Card 2: Attendance (Green Theme - Multiple Users) */}
        <div className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden transition hover:shadow-lg ">
          <div className="relative z-10">
            <h3 className="text-gray-500 text-sm font-bold">
              کارمندان حاضر امروز
            </h3>
            <p className="text-3xl font-bold text-black mt-2">
              ۴۲ <span className="text-sm font-normal text-gray-400">/ ۴۵</span>
            </p>
          </div>

          {/* Cluster of Users - All text-green-100 */}
          <svg
            className="absolute -left-6 -bottom-6 w-32 h-32 text-gray-200 opacity-60 transform -rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <svg
            className="absolute top-2 left-1/4 w-16 h-16 text-gray-200 opacity-70 transform rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* Card 3: Overtime (Orange Theme - Multiple Clocks) */}
        <div className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden transition hover:shadow-lg ">
          <div className="relative z-10">
            <h3 className="text-gray-500 text-sm font-bold">
              مجموع اضافه کاری
            </h3>
            <p className="text-3xl font-bold text-black mt-2">
              ۱۲.۵{" "}
              <span className="text-sm font-normal text-gray-400">ساعت</span>
            </p>
          </div>

          {/* Cluster of Clocks - All text-orange-100 */}
          <svg
            className="absolute -left-6 -bottom-6 w-32 h-32 text-gray-200 opacity-60 transform -rotate-45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <svg
            className="absolute top-2 left-1/4 w-12 h-12 text-gray-200 opacity-70 transform rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
      </div>

      {/* BAR GRAPH LOGIC */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-black">
          گراف تولیدات ماهانه
        </h3>
        <div className="flex items-end space-x-4 space-x-reverse h-64 mt-4">
          {products.map((product) => {
            const heightPercent = (product.produced / maxProduced) * 100;
            return (
              <div
                key={product.id}
                className="flex flex-col items-center flex-1 h-full justify-end"
              >
                <span className="text-xs text-gray-900 mb-1">
                  {product.produced}
                </span>
                {/* We wrap the bar in flex-1 so it has a strict area to grow in */}
                <div className="w-full max-w-[50px] flex-1 flex items-end">
                  <div
                    className="w-full bg-[#8c2e25] rounded-t transition-all"
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>
                <span className="text-xs text-center mt-2 h-8 overflow-hidden text-black">
                  {product.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
