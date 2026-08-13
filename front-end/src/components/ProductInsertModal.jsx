import React, { useEffect, useState } from "react";
import { X, PackagePlus, Tags, Weight, Sparkles } from "lucide-react";
import { apiUrl } from "../api";

export default function ProductInsertModal({
  isOpen,
  onClose,
  onProductAdded,
  categories: initialCategories = [],
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isOpen) return;

    if (initialCategories.length > 0) {
      setCategories(initialCategories);
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await fetch(apiUrl("/product-categories"));
        const data = await res.json();
        setCategories(data.data || data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, [isOpen, initialCategories]);

  if (!isOpen) return null;

  const resetForm = () => {
    setSelectedCategoryId("");
    setUseNewCategory(false);
    setNewCategoryName("");
    setProductName("");
    setWeight("");
    setMessage({ type: "", text: "" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      setMessage({ type: "error", text: "نام محصول را وارد کنید." });
      return;
    }

    if (useNewCategory) {
      if (!newCategoryName.trim()) {
        setMessage({ type: "error", text: "نام دسته‌بندی جدید را وارد کنید." });
        return;
      }
    } else if (!selectedCategoryId) {
      setMessage({ type: "error", text: "لطفاً یک دسته‌بندی انتخاب کنید." });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      let categoryId = selectedCategoryId;

      if (useNewCategory) {
        const categoryRes = await fetch(apiUrl("/product-categories"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name: newCategoryName.trim() }),
        });

        const categoryData = await categoryRes.json();
        if (!categoryRes.ok) {
          throw new Error(categoryData?.message || "ثبت دسته‌بندی انجام نشد.");
        }

        categoryId = categoryData?.data?.id || categoryData?.id;
        if (!categoryId) {
          throw new Error("شناسه دسته‌بندی دریافت نشد.");
        }

        setCategories((prev) => [
          ...prev,
          { id: categoryId, name: newCategoryName.trim() },
        ]);
      }

      const productRes = await fetch(apiUrl("/products"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: productName.trim(),
          weight: weight.trim(),
          category_id: categoryId,
        }),
      });

      const productData = await productRes.json();
      if (!productRes.ok) {
        throw new Error(productData?.message || "ثبت محصول انجام نشد.");
      }

      setMessage({ type: "success", text: "محصول با موفقیت اضافه شد." });
      onProductAdded?.();
      resetForm();
      setTimeout(() => onClose(), 700);
    } catch (error) {
      setMessage({ type: "error", text: error.message || "خطایی رخ داد." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6"
      dir="rtl"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#82352B] to-[#a24c39] px-6 py-4 text-white">
          <div>
            <div className="flex items-center gap-2">
              <PackagePlus size={20} />
              <h3 className="text-lg font-bold">افزودن محصول جدید</h3>
            </div>
            <p className="mt-1 text-sm text-white/80">
              دسته‌بندی را انتخاب کنید و محصول خود را ثبت نمایید.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-white/90 transition hover:bg-white/10"
            title="بستن"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="rounded-xl  px-4">
            <label className="mb-2 flex items-center gap-2 text-md font-semibold text-gray-700">
              دسته‌بندی محصول
            </label>

            {!useNewCategory ? (
              <>
                <select
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 outline-none focus:border-[#82352B] focus:ring-1 focus:ring-[#82352B]/20"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  <option value="">انتخاب دسته‌بندی...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setUseNewCategory(true)}
                  className="mt-3 text-sm font-semibold text-[#82352B] transition hover:text-[#6c2c23]"
                >
                  ← افزودن دسته‌بندی جدید
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="نام دسته‌بندی جدید"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#82352B] focus:ring-2 focus:ring-[#82352B]/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUseNewCategory(false);
                    setNewCategoryName("");
                  }}
                  className="mt-3 text-sm font-semibold text-gray-600 transition hover:text-[#82352B]"
                >
                  ← بازگشت به انتخاب دسته‌بندی موجود
                </button>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 px-4">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                نام محصول
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder=" میخ ۲ اینچ"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#82352B] focus:ring-1 focus:ring-[#82352B]/20"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                وزن
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="مثلاً 25kg"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#82352B] focus:ring-1 focus:ring-[#82352B]/20"
              />
            </div>
          </div>

          {message.text ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end pl-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-300 px-3 py-2 font-semibold text-sm text-gray-700 transition hover:bg-gray-100"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#82352B] px-3 py-2 font-semibold text-sm text-white transition hover:bg-[#6c2c23] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "در حال ثبت..." : "ثبت محصول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
