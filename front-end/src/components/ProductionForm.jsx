// src/components/ProductionForm.jsx
import React, { useState } from "react";
import { branches, categories, products } from "../data/mockData";

export default function ProductionForm() {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  const filteredProducts = products.filter(
    (p) => p.category_id === parseInt(selectedCat),
  );

  let weightOptions = [];
  if (selectedCat === "1") {
    weightOptions = ["12.5kg", "25kg"];
  } else if (selectedCat === "2") {
    weightOptions = ["25g", "50kg"];
  }

  // A reusable small arrow SVG to make the code clean
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
      className="bg-white p-8 rounded-xl my-10 shadow-lg border border-gray-100 max-w-4xl mx-auto"
      dir="rtl"
    >
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">ثبت تولیدات روزانه</h2>
        <p className="text-gray-500 text-sm mt-1">
          لطفاً معلومات تولیدات جدید را با دقت انتخاب کنید.
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alert("ثبت شد!");
        }}
      >
        {/* Branch */}
        <div className="max-w-xs">
          <div className="relative">
            <select
              required
              className="appearance-none w-full border border-gray-300 bg-white p-3  text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] transition-all cursor-pointer"
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

        {/* Category & Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              <select
                required
                className="appearance-none w-full border border-gray-300 bg-white p-3  text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] transition-all cursor-pointer"
                value={selectedCat}
                onChange={(e) => {
                  setSelectedCat(e.target.value);
                  setSelectedWeight("");
                }}
              >
                <option value=""> انتخاب محصول...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <DropdownArrow />
            </div>
          </div>
          <div>
            <div className="relative">
              <select
                required
                className="appearance-none w-full border border-gray-300 bg-white p-3  text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] transition-all cursor-pointer disabled:bg-gray-100"
                disabled={!selectedCat}
              >
                <option value="">نوعیت محصول...</option>
                {filteredProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <DropdownArrow />
            </div>
          </div>
        </div>

        {/* Quantity & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="number"
              required
              min="1"
              className="w-full border border-gray-300 bg-white p-3  text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] transition-all"
              placeholder="تعداد تولید شده"
            />
          </div>
          <div>
            <div className="relative">
              <select
                required
                className=" appearance-none w-full border border-gray-300 bg-white p-3  text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8c2e25] transition-all cursor-pointer disabled:bg-gray-100"
                disabled={!selectedCat}
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                dir="rtl"
              >
                <option value="" dir="rtl">
                  انتخاب وزن...
                </option>
                {weightOptions.map((weight, index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                ))}
              </select>
              <DropdownArrow />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 mt-6 border-t border-gray-100">
          <button
            type="submit"
            className="bg-[#8c2e25] text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-[#5a1f1a] transition-all"
          >
            ذخیره تولیدات
          </button>
        </div>
      </form>
    </div>
  );
}
