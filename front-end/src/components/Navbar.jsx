// src/components/Navbar.jsx
import React from 'react';
import { LayoutDashboard, Factory, Users, Clock, FileText, LogOut } from 'lucide-react';

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded transition ${active ? 'bg-[#5a1f1a] text-white' : 'hover:bg-[#5a1f1a]  '}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function Navbar({ activeTab, setActiveTab, onLogout }) {
  return (
    <>
      {/* TOP NAVIGATION BAR */}
      <div className="bg-[#8c2e25] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          <div className="text-2xl font-bold">جهان فولاد</div>
          <nav className="hidden md:flex space-x-4 space-x-reverse">
            <NavBtn  label="داشبورد" active={activeTab==='dashboard'} onClick={() => setActiveTab('dashboard')} />
            <NavBtn label="ثبت تولیدات" active={activeTab==='production'} onClick={() => setActiveTab('production')} />
            <NavBtn label="حاضری" active={activeTab==='attendance'} onClick={() => setActiveTab('attendance')} />
            <NavBtn  label="اضافه کاری" active={activeTab==='overtime'} onClick={() => setActiveTab('overtime')} />
            <NavBtn  label="راپور ها" active={activeTab==='reports'} onClick={() => setActiveTab('reports')} />
          </nav>
          <button onClick={onLogout} className="flex items-center space-x-1 space-x-reverse  hover:text-red-100">
            <LogOut size={20} />
            <span className="hidden md:inline">خروج</span>
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      <div className="md:hidden bg-white p-2 border-b">
        <select className="w-full p-2 border rounded" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
          <option value="dashboard">داشبورد</option>
          <option value="production">ثبت تولیدات</option>
          <option value="attendance">حاضری</option>
          <option value="overtime">اضافه کاری</option>
          <option value="reports">راپور ها</option>
        </select>
      </div>
    </>
  );
}
