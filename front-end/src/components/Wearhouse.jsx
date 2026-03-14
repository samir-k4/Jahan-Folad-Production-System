import { Package, ArrowDownRight, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
// Fake data for testing the UI
const branches = [
  { id: 1, name: "نمایندگی کابل" },
  { id: 2, name: "نمایندگی هرات" },
];

const inventories = [
  {
    id: 1,
    branch_id: 1,
    productName: "میخ ۲ انچ کارتن",
    weight: "25kg",
    currentStock: 450,
    status: "عادی",
  },
  {
    id: 2,
    branch_id: 1,
    productName: "سیم سیاه ۵۰ کیلو",
    weight: "50kg",
    currentStock: 12,
    status: "رو به اتمام",
  },
  {
    id: 3,
    branch_id: 2,
    productName: "میخ ۳ انچ کارتن",
    weight: "25kg",
    currentStock: 850,
    status: "عادی",
  },
  {
    id: 4,
    branch_id: 2,
    productName: "سیم گالوانیزه",
    weight: "50kg",
    currentStock: 0,
    status: "خلاص شده",
  },
];

export default function Godam() {
  // States for the Deduction Form
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [deductAmount, setDeductAmount] = useState("");

  // Logic: Filter inventory based on selected branch for the dropdown
  const availableProducts = selectedBranch
    ? inventories.filter(
        (inv) =>
          inv.branch_id === parseInt(selectedBranch) && inv.currentStock > 0,
      )
    : [];

  const handleDeduct = (e) => {
    e.preventDefault();
    alert(`مقدار ${deductAmount} از گدام خارج شد!`);
    setDeductAmount("");
  };

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
    <div className="bg-transparent max-w-7xl mx-auto my-10 space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 space-x-reverse">
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
          <Package size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            مدیریت گدام (Warehouse)
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            کنترول موجودی و خروج دستی محصولات از گدام.
          </p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-gray-500 font-bold text-sm">
              مجموع اقلام در گدام
            </h3>
            <p className="text-3xl font-bold text-indigo-900 mt-2">
              ۱,۳۱۲{" "}
              <span className="text-sm font-normal text-gray-400">
                بسته / کارتن
              </span>
            </p>
          </div>
          <Package
            size={48}
            className="text-indigo-50 absolute -left-2 -bottom-2 transform -rotate-12"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-gray-500 font-bold text-sm">
              اقلام رو به اتمام
            </h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">
              ۲ <span className="text-sm font-normal text-gray-400">محصول</span>
            </p>
          </div>
          <AlertTriangle
            size={48}
            className="text-amber-50 absolute -left-2 -bottom-2 transform rotate-12"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RIGHT COLUMN: Deduction Form (Takes 1/3 of space) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex items-center space-x-2 space-x-reverse mb-6 border-b pb-4">
            <ArrowDownRight size={20} className="text-red-500" />
            <h3 className="text-lg font-bold text-gray-800">
              خروج محصولات (فروش/انتقال)
            </h3>
          </div>

          <form onSubmit={handleDeduct} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                نمایندگی
              </label>
              <div className="relative">
                <select
                  required
                  className="appearance-none w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                  value={selectedBranch}
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    setSelectedProduct("");
                  }}
                >
                  <option value="">انتخاب...</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <DropdownArrow />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                محصول
              </label>
              <div className="relative">
                <select
                  required
                  className="appearance-none w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer disabled:opacity-50"
                  disabled={!selectedBranch}
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">انتخاب محصول...</option>
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.productName} ({p.currentStock} موجود)
                    </option>
                  ))}
                </select>
                <DropdownArrow />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                مقدار خروج
              </label>
              <input
                type="number"
                required
                min="1"
                className="w-full border border-gray-300 bg-gray-50 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="مثلاً ۵۰"
                value={deductAmount}
                onChange={(e) => setDeductAmount(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all flex justify-center items-center space-x-2 space-x-reverse"
            >
              <span>ثبت خروج از گدام</span>
            </button>
          </form>
        </div>

        {/* LEFT COLUMN: Inventory Table (Takes 2/3 of space) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-lg font-bold text-gray-800">
              موجودی فعلی گدام
            </h3>

            {/* Simple Search Bar styling */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="جستجوی محصول..."
                className="w-full border border-gray-300 rounded-lg py-2 pr-10 pl-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50"
              />
              <Search
                size={16}
                className="text-gray-400 absolute right-3 top-3"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">محصول</th>
                  <th className="p-4 font-semibold text-gray-700 text-center">
                    وزن
                  </th>
                  <th className="p-4 font-semibold text-gray-700 text-center">
                    موجودی
                  </th>
                  <th className="p-4 font-semibold text-gray-700 text-center">
                    وضعیت
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventories.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-800 font-medium">
                      {inv.productName}
                    </td>
                    <td className="p-4 text-center text-gray-600" dir="ltr">
                      {inv.weight}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`font-bold text-lg ${inv.currentStock === 0 ? "text-red-500" : "text-indigo-700"}`}
                      >
                        {inv.currentStock}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {/* Status logic based on stock amount */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          inv.currentStock === 0
                            ? "bg-red-100 text-red-700"
                            : inv.currentStock < 50
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
