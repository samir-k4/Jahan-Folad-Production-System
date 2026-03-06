// src/components/Reports.jsx
import React from 'react';
import { Printer } from 'lucide-react';

export default function Reports() {
  const handlePrint = () => window.print();

  return (
    <div className="bg-white p-6 rounded-lg shadow printable-area">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">بخش راپور ها</h2>
      </div>

      {/* Production Reports Section */}
      <div className="mb-8 p-4 border rounded-lg bg-blue-50">
        <h3 className="text-lg font-bold mb-4 text-blue-900">راپور تولیدات</h3>
        <div className="flex space-x-4 space-x-reverse mb-4">
          <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            <Printer size={18} /><span>راپور روزانه</span>
          </button>
          <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            <Printer size={18} /><span>راپور هفته‌گی</span>
          </button>
          <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900">
            <Printer size={18} /><span>راپور ماهانه</span>
          </button>
        </div>
        
        <table className="w-full text-right border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">نمایندگی</th>
              <th className="p-2 border">محصول</th>
              <th className="p-2 border">وزن فی کارتن</th>
              <th className="p-2 border">مقدار تولید</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">نمایندگی کابل</td>
              <td className="p-2 border">میخ ۲ انچ کارتن</td>
              <td className="p-2 border">25kg</td>
              <td className="p-2 border">۴,۵۰۰</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* HR Reports Section */}
      <div className="p-4 border rounded-lg bg-green-50">
        <h3 className="text-lg font-bold mb-4 text-green-900">راپور منابع بشری (ماهانه)</h3>
        <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 mb-4">
            <Printer size={18} /><span>چاپ راپور کارمندان</span>
        </button>
        <table className="w-full text-right border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">نام کارمند</th>
              <th className="p-2 border">حاضری ماهانه</th>
              <th className="p-2 border">اضافه کاری ماهانه</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">احمد</td>
              <td className="p-2 border" dir="ltr">24 / 27</td>
              <td className="p-2 border">۱۲.۵ ساعت</td>
            </tr>
            <tr>
              <td className="p-2 border">محمود</td>
              <td className="p-2 border" dir="ltr">26 / 27</td>
              <td className="p-2 border text-red-500">کاری انجام نشده</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
