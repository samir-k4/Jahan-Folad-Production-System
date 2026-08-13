import React, { useState, useEffect } from "react";
import {
  PackageSearch,
  Plus,
  Edit,
  Tag,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import ProductInsertModal from "./ProductInsertModal";
import ProductEditCard from "./ProductEditCard";
import { apiUrl } from "../api";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const productsResponse = await fetch(apiUrl("/products"));
      const categoriesResponse = await fetch(apiUrl("/product-categories"));

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const productsData = await productsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setProducts(productsData.data || productsData);
      setCategories(categoriesData.data || categoriesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleShowToast = (toastData) => {
    setToast({
      show: true,
      type: toastData.type || "success",
      message: toastData.message || "",
    });
  };

  const handleProductAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Group products by category and apply search filter
  const filteredCategories = categories
    .map((category) => {
      const categoryProducts = products.filter(
        (p) => p.category_id === category.id,
      );

      const matchedProducts = categoryProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      return {
        ...category,
        products: matchedProducts,
      };
    })
    .filter((category) => category.products.length > 0);

  if (loading) {
    return <div className="text-center p-8">در حال بارگذاری اطلاعات...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        خطا در دریافت اطلاعات: {error}
      </div>
    );
  }

  return (
    <div className="p-8 rounded-xl max-w-full mx-auto" dir="rtl">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-lg px-6 py-4 text-white shadow-lg transition-all duration-300 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToast({ ...toast, show: false })}
            className="ml-2 rounded-full p-1 hover:bg-white/20 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse mb-4 md:mb-0">
          <div className="bg-[#82352B] text-white p-2.5 rounded-xl">
            <PackageSearch size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              لیست محصولات سیستم
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              مشاهده، ویرایش و افزودن محصولات جدید به دیتابیس.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 space-x-reverse bg-[#82352B] hover:bg-[#6c2c23] text-white font-bold py-2.5 px-5 rounded-lg shadow transition-all"
        >
          <Plus size={18} />
          <span>محصول جدید</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8 w-full md:w-1/3">
        <input
          type="text"
          placeholder="جستجو در محصولات یا دسته‌بندی..."
          className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Section Container */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <h3 className="font-bold text-xl text-gray-800">
                  {category.name}
                </h3>
              </div>
              <span className="text-xs bg-gray-200 text-gray-700 font-semibold px-2.5 py-1 rounded-full">
                {category.products.length} محصول
              </span>
            </div>

            {/* Product Grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-300 rounded-lg p-4 flex justify-between items-center transition-all hover:shadow-md"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-gray-800 text-base" dir="ltr">
                      {product.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500" dir="rtl">
                      وزن:{" "}
                      <span className="text-gray-700">{product.weight}</span>
                    </p>
                  </div>

                  {/* Edit Action Button */}
                  <div>
                    <button
                      onClick={() => setEditProduct(product)}
                      className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-md transition-colors"
                      title="ویرایش محصول"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="w-full text-center p-10 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-700">موردی یافت نشد</h3>
            <p className="text-gray-500 mt-2">
              با جستجوی شما هیچ محصول یا دسته‌بندی‌ای مطابقت ندارد.
            </p>
          </div>
        )}
      </div>

      <ProductInsertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
        categories={categories}
      />

      <ProductEditCard
        isOpen={Boolean(editProduct)}
        product={editProduct}
        categories={categories}
        onClose={() => setEditProduct(null)}
        onUpdated={handleProductAdded}
        onDeleted={handleProductAdded}
        onShowToast={handleShowToast}
      />
    </div>
  );
}
