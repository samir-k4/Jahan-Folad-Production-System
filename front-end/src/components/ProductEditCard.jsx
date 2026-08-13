import React, { useEffect, useState } from "react";
import { X, Save, Trash2, Edit3 } from "lucide-react";
import { apiUrl } from "../api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function ProductEditCard({
  product,
  categories,
  isOpen,
  onClose,
  onUpdated,
  onDeleted,
  onShowToast,
}) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setWeight(product.weight || "");
      setCategoryId(product.category_id ? String(product.category_id) : "");
      setMessage({ type: "", text: "" });
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleUpdate = async () => {
    if (!name.trim()) {
      setMessage({ type: "error", text: "نام محصول را وارد کنید." });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(apiUrl(`/products/${product.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          weight: weight.trim(),
          category_id: categoryId,
        }),
      });

      if (!response.ok) {
        throw new Error("به‌روزرسانی محصول انجام نشد.");
      }

      // Show success toast and close modal
      onShowToast?.({
        type: "success",
        message: "محصول با موفقیت به‌روزرسانی شد.",
      });
      onUpdated?.();
      setTimeout(() => onClose(), 300);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "خطایی رخ داد." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(apiUrl(`/products/${product.id}`), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("حذف محصول انجام نشد.");
      }

      // Show success toast and close modals
      onShowToast?.({
        type: "success",
        message: "محصول با موفقیت حذف شد.",
      });
      setShowDeleteModal(false);
      onDeleted?.();
      setTimeout(() => onClose(), 300);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "خطایی رخ داد." });
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 px-4 py-6 backdrop-blur-sm transition-opacity"
      dir="rtl"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#82352B] px-6 py-4 text-white">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="rounded-lg bg-white/10 p-2">
              <Edit3 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold">ویرایش محصول</h3>
              <p className="mt-0.5 text-xs text-white/80">
                اطلاعات محصول را ویرایش کنید
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 transition hover:bg-white/20"
            title="بستن"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-5 p-6">
          {/* Product Name Input */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              نام محصول
            </label>
            <input
              type="text"
              value={name}
              dir="ltr"
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-right font-semibold text-gray-800 outline-none transition focus:border-[#82352B] focus:bg-white focus:ring-1 focus:ring-[#82352B]/20"
              placeholder="10 x 4"
            />
          </div>

          {/* Weight Input */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              وزن
            </label>
            <input
              type="text"
              value={weight}
              dir="ltr"
              onChange={(e) => setWeight(e.target.value)}
              className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-right font-semibold text-gray-800 outline-none transition focus:border-[#82352B] focus:bg-white focus:ring-1 focus:ring-[#82352B]/20"
              placeholder="12.5KG"
            />
          </div>

          {/* Category Select Dropdown */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              دسته‌بندی
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 px-4 font-semibold text-gray-800 outline-none transition focus:border-[#82352B] focus:bg-white focus:ring-1 focus:ring-[#82352B]/20"
            >
              <option value="">انتخاب دسته‌بندی...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notification Message */}
          {message.text && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Trash2 size={16} />
              {deleting ? "در حال حذف..." : "حذف"}
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#82352B] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#6c2c23] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={16} />
              {saving ? "در حال ذخیره..." : "به‌روزرسانی"}
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          productName={product.name}
          loading={deleting}
        />
      </div>
    </div>
  );
}
