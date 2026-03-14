
import  { useState } from 'react';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProductionForm from './components/ProductionForm';
import AttendanceForm from './components/AttendanceForm';
import OvertimeForm from './components/OvertimeForm';
import Reports from './components/Reports';
import Wearhouse from './components/Wearhouse';
import EmployeePage from './components/EmployeePage';

export default function App() {
  
  const [activeTab, setActiveTab] = useState('dashboard');


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'production': return <ProductionForm />;
      case 'attendance': return <AttendanceForm />;
      case 'overtime': return <OvertimeForm />;
      case 'reports': return <Reports />;
      case 'wearehouse': return <Wearhouse />;
      case 'employees': return <EmployeePage />;
      default: return <Dashboard />;
    }
  };

  
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 overflow-y-auto p-6 w-full">
        {renderContent()}
      </main>
    </div>
  );
}
