
import  { useState } from 'react';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProductionForm from './components/ProductionForm';
import AttendanceForm from './components/AttendanceForm';
import OvertimeForm from './components/OvertimeForm';
import Reports from './components/Reports';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'production': return <ProductionForm />;
      case 'attendance': return <AttendanceForm />;
      case 'overtime': return <OvertimeForm />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto p-6 w-full">
        {renderContent()}
      </main>
    </div>
  );
}
