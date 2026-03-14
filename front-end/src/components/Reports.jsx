import React from 'react';
import { Printer, Factory, Users } from 'lucide-react';

export default function Reports() {
  const handlePrint = () => window.print();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-7xl mx-auto my-10 printable-area" dir="rtl">
      
      {/* Page Header */}
      <div className="border-b pb-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">بخش راپور ها</h2>
        <p className="text-gray-500 mt-2">مدیریت و چاپ گزارشات تولیدات و منابع بشری.</p>
      </div>

      <div className="space-y-10">
        
        {/* --- Production Reports Section --- */}
        <div className="p-6 border border-blue-100 rounded-xl bg-gradient-to-br from-blue-50/50 to-white shadow-sm">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 md:mb-0">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <Factory size={24} />
              </div>
              <h3 className="text-xl font-bold text-blue-900">راپور تولیدات</h3>
            </div>
            
            {/* Buttons with Color Hierarchy */}
            <div className="flex space-x-3 space-x-reverse">
              <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-[#8c2e25] text-white border border-gray-300  px-4 py-2 rounded-lg hover:bg-[#5a1f1a] transition-all font-medium shadow-sm">
                <Printer size={18} className="text-white" />
                <span>راپور روزانه</span>
              </button>
              <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-[#8c2e25] text-white px-border border-gray-300  px-4 py-2 rounded-lg hover:bg-[#5a1f1a] transition-all font-medium shadow-sm">
                <Printer size={18} className="text-white" />
                <span>راپور هفته‌گی</span>
              </button>
              <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-[#8c2e25] text-white px-5 py-2 rounded-lg hover:bg-[#5a1f1a] transition-all font-bold shadow-md">
                <Printer size={18} />
                <span>راپور ماهانه</span>
              </button>
            </div>
          </div>
          
          {/* Table Container with overflow-hidden for perfect corners */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">نمایندگی</th>
                  <th className="p-4 font-semibold text-gray-700">محصول</th>
                  <th className="p-4 font-semibold text-gray-700">وزن فی کارتن</th>
                  <th className="p-4 font-semibold text-gray-700">مقدار تولید</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">نمایندگی کابل</td>
                  <td className="p-4 text-gray-600">میخ ۲ انچ کارتن</td>
                  <td className="p-4 text-gray-600" dir="ltr">25kg</td>
                  <td className="p-4 text-blue-700 font-bold text-lg">۴,۵۰۰</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- HR Reports Section --- */}
        <div className="p-6 border border-green-100 rounded-xl bg-gradient-to-br from-green-50/50 to-white shadow-sm">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 md:mb-0">
              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-green-900">راپور منابع بشری (ماهانه)</h3>
            </div>
            
            <button onClick={handlePrint} className="flex items-center space-x-2 space-x-reverse bg-[#8c2e25] text-white px-5 py-2 rounded-lg hover:bg-[#5a1f1a] transition-all font-bold shadow-md">
                <Printer size={18} />
                <span>چاپ راپور کارمندان</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">نام کارمند</th>
                  <th className="p-4 font-semibold text-gray-700 text-center">حاضری ماهانه</th>
                  <th className="p-4 font-semibold text-gray-700 text-center">اضافه کاری ماهانه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">احمد</td>
                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm" dir="ltr">24 / 27</span>
                  </td>
                  <td className="p-4 text-center text-gray-700 font-semibold">۱۲.۵ ساعت</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">محمود</td>
                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm" dir="ltr">26 / 27</span>
                  </td>
                  <td className="p-4 text-center text-red-500 font-medium">کاری انجام نشده</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}