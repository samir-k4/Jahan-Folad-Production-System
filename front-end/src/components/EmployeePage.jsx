import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  User,
  Printer,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Calendar,
  CheckCircle,
  UserMinus,
  UserCheck,
} from "lucide-react";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const recordsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8000/api/employees")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((emp) => ({
          id: emp.id,
          code: emp.employee_code || emp.employee_ID,
          name: emp.full_name,
          position: emp.position,
          branch: emp.branch ? emp.branch.name : "نامشخص",
          salary: emp.salary,
          joiningDate: emp.joining_date,
          nationalId: emp.national_id || "ثبت نشده",
          status: emp.status || "فعال",
        }));
        setEmployees(formattedData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/employees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setEmployees(employees.filter((emp) => emp.id !== id));

          setShowDeleteConfirm(false);
          setSelectedEmployee(null);

          setToastMessage("کارمند با موفقیت از سیستم حذف شد!");
          setTimeout(() => {
            setToastMessage(null);
          }, 3000);
        } else {
          alert("خطا در سرور! دیتابیس نتوانست کارمند را حذف کند.");
          console.error("Failed to delete employee. Status:", response.status);
        }
      })
      .catch((error) => console.error("Error deleting:", error));
  };

  // LOGIC 2: Dynamic Toggle - Switches between Active and Inactive and saves to Database
  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "فعال" ? "غیر فعال" : "فعال";

    // LOGIC: Send a PUT request to update the database
    fetch(`http://localhost:8000/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          // If database is successfully updated, update React's memory
          setEmployees(
            employees.map((emp) =>
              emp.id === id ? { ...emp, status: newStatus } : emp,
            ),
          );

          setShowDeactivateConfirm(false);
          setSelectedEmployee(null);

          setToastMessage(`وضعیت کارمند به ${newStatus} تغییر کرد!`);
          setTimeout(() => {
            setToastMessage(null);
          }, 3000);
        } else {
          alert("خطا در سرور! وضعیت در دیتابیس تغییر نکرد.");
          console.error("Failed to update status. Status:", response.status);
        }
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const filteredEmployees = employees.filter(
    (emp) => emp.name?.includes(searchTerm) || emp.code?.includes(searchTerm),
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEmployees.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage) || 1;

  const handlePrint = () => window.print();

  return (
    <div className="max-w-7xl mx-auto my-10 space-y-6" dir="rtl">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">مدیریت کارمندان</h2>
          <p className="text-gray-500 text-sm mt-1">
            لیست، جستجو و پروفایل تمام کارمندان شرکت.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center space-x-2 space-x-reverse transform hover:scale-105">
          <UserPlus size={20} />
          <span>اضافه کردن کارمند جدید</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="جستجو بر اساس نام یا آیدی..."
            className="w-full border border-gray-300 rounded-lg py-3 pr-10 pl-3 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search
            size={20}
            className="text-gray-400 absolute right-3 top-3.5"
          />
        </div>

        <div className="flex items-center space-x-2 space-x-reverse w-full md:w-auto">
          <label className="text-sm font-bold text-gray-700">
            راپور سفارشی:
          </label>
          <div className="relative">
            <select className="appearance-none border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
              <option value="">همه کارمندان</option>
              <option value="this_month">استخدام‌های این ماه</option>
              <option value="last_month">استخدام‌های ماه گذشته</option>
              <option value="this_year">استخدام‌های امسال</option>
            </select>
            <Calendar
              size={18}
              className="text-gray-500 absolute left-3 top-3.5 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-bold">
            در حال بارگذاری اطلاعات از دیتابیس...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-semibold text-gray-700">آیدی</th>
                    <th className="p-4 font-semibold text-gray-700">
                      نام کامل
                    </th>
                    <th className="p-4 font-semibold text-gray-700">وظیفه</th>
                    <th className="p-4 font-semibold text-gray-700">
                      نمایندگی
                    </th>
                    <th className="p-4 font-semibold text-gray-700">معاش</th>
                    <th className="p-4 font-semibold text-gray-700 text-center">
                      وضعیت
                    </th>
                    <th className="p-4 font-semibold text-gray-700 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentRecords.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-gray-600 font-medium" dir="ltr">
                        {emp.code}
                      </td>
                      <td className="p-4 text-gray-800 font-bold">
                        {emp.name}
                      </td>
                      <td className="p-4 text-gray-600">{emp.position}</td>
                      <td className="p-4 text-gray-600">{emp.branch}</td>
                      <td className="p-4 text-green-600 font-bold">
                        {emp.salary} افغانی
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${emp.status === "فعال" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedEmployee(emp)}
                          className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-800 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 space-x-reverse mx-auto"
                        >
                          <User size={18} />
                          <span>پروفایل</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {currentRecords.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-6 text-center text-gray-500">
                        هیچ کارمندی یافت نشد.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                نمایش{" "}
                {indexOfFirstRecord + (filteredEmployees.length > 0 ? 1 : 0)} تا{" "}
                {Math.min(indexOfLastRecord, filteredEmployees.length)} از{" "}
                {filteredEmployees.length} کارمند
              </p>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="px-4 py-2 font-bold text-gray-700">
                  {currentPage}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-2 border border-gray-300 rounded-lg bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden printable-area">
            <div className="bg-gray-800 p-6 flex justify-between items-center text-white">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                  <User size={32} className="text-gray-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedEmployee.position}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-white text-3xl font-bold mb-auto"
              >
                &times;
              </button>
            </div>

            <div className="p-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">آیدی کارمند</p>
                <p className="font-bold text-lg text-gray-800" dir="ltr">
                  {selectedEmployee.code}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  نمبر تذکره (National ID)
                </p>
                <p className="font-bold text-lg text-gray-800" dir="ltr">
                  {selectedEmployee.nationalId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">تاریخ شمولیت</p>
                <p className="font-bold text-lg text-gray-800" dir="ltr">
                  {selectedEmployee.joiningDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">معاش (افغانی)</p>
                <p className="font-bold text-lg text-green-600">
                  {selectedEmployee.salary}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">نمایندگی</p>
                <p className="font-bold text-lg text-gray-800">
                  {selectedEmployee.branch}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">وضعیت</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${selectedEmployee.status === "فعال" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {selectedEmployee.status}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 border-t flex justify-end space-x-3 space-x-reverse">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 space-x-reverse bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-all font-bold"
              >
                <Printer size={18} />
                <span>چاپ پروفایل</span>
              </button>

              <button className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-bold">
                <Edit size={18} />
                <span>ویرایش</span>
              </button>

              <button
                onClick={() => setShowDeactivateConfirm(true)}
                className={`flex items-center space-x-2 space-x-reverse text-white px-5 py-2.5 rounded-lg transition-all font-bold ${
                  selectedEmployee.status === "فعال"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {selectedEmployee.status === "فعال" ? (
                  <UserMinus size={18} />
                ) : (
                  <UserCheck size={18} />
                )}
                <span>
                  {selectedEmployee.status === "فعال"
                    ? "غیر فعال کردن"
                    : "فعال کردن"}
                </span>
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center space-x-2 space-x-reverse bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all font-bold"
              >
                <Trash2 size={18} />
                <span>حذف</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL FOR TOGGLE (Soft Delete / Activate) --- */}
      {showDeactivateConfirm && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center transform transition-all">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                selectedEmployee.status === "فعال"
                  ? "bg-orange-100"
                  : "bg-green-100"
              }`}
            >
              {selectedEmployee.status === "فعال" ? (
                <UserMinus size={32} className="text-orange-600" />
              ) : (
                <UserCheck size={32} className="text-green-600" />
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              تغییر وضعیت کارمند
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              آیا مطمئن هستید که می‌خواهید وضعیت این کارمند را به "
              {selectedEmployee.status === "فعال" ? "غیر فعال" : "فعال"}" تغییر
              دهید؟
            </p>
            <div className="flex space-x-3 space-x-reverse justify-center">
              <button
                onClick={() =>
                  handleToggleStatus(
                    selectedEmployee.id,
                    selectedEmployee.status,
                  )
                }
                className={`text-white font-bold py-2.5 px-6 rounded-lg transition-all w-full ${
                  selectedEmployee.status === "فعال"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                بله،{" "}
                {selectedEmployee.status === "فعال" ? "غیر فعال کن" : "فعال کن"}
              </button>
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-6 rounded-lg transition-all w-full"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL FOR DELETE (Hard Delete) --- */}
      {showDeleteConfirm && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center transform transition-all">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              حذف کامل کارمند
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              آیا مطمئن هستید؟ این عمل کارمند را به صورت دائمی از دیتابیس پاک
              می‌کند و غیرقابل بازگشت است.
            </p>
            <div className="flex space-x-3 space-x-reverse justify-center">
              <button
                onClick={() => handleDelete(selectedEmployee.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all w-full"
              >
                بله، حذف دائمی
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-6 rounded-lg transition-all w-full"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-10 left-10 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 space-x-reverse z-50 transform transition-all duration-500">
          <CheckCircle size={24} />
          <span className="font-bold text-lg">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
