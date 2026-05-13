import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Settings, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ProductionForm from './components/ProductionForm';
import ProductsList from './components/ProductsList';
import AttendanceForm from './components/AttendanceForm';
import OvertimeForm from './components/OvertimeForm';
import Reports from './components/Reports';
import EmployeePage from './components/EmployeePage';
import Wearhouse from './components/Wearhouse';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname;

  const handleMobileNavChange = (event) => {
    navigate(event.target.value);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="bg-[#82352B] text-white px-8 py-2.5 flex justify-between items-center shadow-md fixed top-0 w-full z-50">
        <div className="text-xl font-bold">جهان فولاد</div>
        
        <div className="hidden md:flex items-center space-x-6 space-x-reverse text-sm font-medium">
          <Link to="/" className={`hover:text-gray-300 py-2 ${activeTab === '/' ? 'text-gray-300 border-b-2 border-white' : ''}`}>صفحه اصلی</Link>
          
          {/* Dropdown for Production & Warehouse */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center space-x-1 space-x-reverse hover:text-gray-300 py-2">
              <span>تولیدات و گدام</span>
              <ChevronDown size={14} />
            </div>
            <div className="absolute right-0 w-48 bg-white text-gray-800 rounded-md shadow-xl hidden group-hover:block border border-gray-100 overflow-hidden">
              <Link to="/production" className="w-full text-right block px-4 py-3 hover:bg-gray-100 border-b border-gray-50 font-bold text-[#82352B]">ثبت تولیدات روزانه</Link>
              <Link to="/products" className="w-full text-right block px-4 py-3 hover:bg-gray-100 border-b border-gray-50">لیست محصولات</Link>
              <Link to="/godam" className="w-full text-right block px-4 py-3 hover:bg-gray-100 border-b border-gray-50">موجودی گدام</Link>
            </div>
          </div>

          {/* Dropdown for Human Resources */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center space-x-1 space-x-reverse hover:text-gray-300 py-2">
              <span>منابع بشری</span>
              <ChevronDown size={14} />
            </div>
            <div className="absolute right-0 w-48 bg-white text-gray-800 rounded-md shadow-xl hidden group-hover:block border border-gray-100 overflow-hidden">
              <Link to="/employees" className="w-full text-right block px-4 py-3 hover:bg-gray-100 border-b border-gray-50">لیست کارمندان</Link>
              <Link to="/attendance" className="w-full text-right block px-4 py-3 hover:bg-gray-100 border-b border-gray-50">ثبت حاضری</Link>
              <Link to="/overtime" className="w-full text-right block px-4 py-3 hover:bg-gray-100">اضافه کاری</Link>
            </div>
          </div>

          <Link to="/reports" className={`hover:text-gray-300 py-2 ${activeTab === '/reports' ? 'text-gray-300 border-b-2 border-white' : ''}`}>راپور ها</Link>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="hover:text-gray-300 p-1" title="تنظیمات سیستم">
            <Settings size={20} />
          </button>
          <button onClick={() => alert('خروج!')} className="flex items-center space-x-1 space-x-reverse hover:text-gray-300 text-sm font-bold bg-[#6c2c23] px-3 py-1.5 rounded-md">
            <LogOut size={16} />
            <span className="hidden md:inline">خروج</span>
          </button>
        </div>
      </nav>

      {/* MOBILE NAV DROPDOWN */}
      <div className="md:hidden bg-white p-2 border-b fixed top-12 w-full z-40 shadow-md mt-2">
        <select className="w-full p-2 border rounded" value={activeTab} onChange={handleMobileNavChange}>
          <option value="/">داشبورد</option>
          <option value="/production">ثبت تولیدات</option>
          <option value="/products">لیست محصولات</option>
          <option value="/godam">موجودی گدام</option>
          <option value="/employees">لیست کارمندان</option>
          <option value="/attendance">حاضری</option>
          <option value="/overtime">اضافه کاری</option>
          <option value="/reports">راپور ها</option>
        </select>
      </div>

      <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full pt-32 md:pt-24">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/production" element={<ProductionForm />} />
          <Route path="/godam" element={<Wearhouse />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/attendance" element={<AttendanceForm />} />
          <Route path="/overtime" element={<OvertimeForm />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}
