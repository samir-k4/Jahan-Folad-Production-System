import React from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="rounded-lg bg-red-100 p-3">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">تایید حذف</h3>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-full p-1.5 transition hover:bg-gray-200 disabled:cursor-not-allowed"
              title="بستن"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 px-6 py-8">
          <div className="space-y-2">
            <p className="text-base font-medium text-gray-700">
              آیا از حذف این محصول مطمئن هستید؟
            </p>
            <p className="text-sm text-gray-500">
              محصول{" "}
              <span className="font-semibold text-gray-700">{productName}</span>{" "}
              به‌طور دائمی حذف خواهد شد.
            </p>
          </div>

          <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3">
            <p className="text-xs font-medium text-red-700">
              ⚠️ این عملیات قابل بازگشت نیست. لطفاً مطمئن باشید.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Trash2 size={16} />
            {loading ? "در حال حذف..." : "تایید و حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
