import React, { useState, useEffect } from "react";
import { PackageSearch, Plus, Edit, Trash2 } from "lucide-react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(
          "http://localhost:8000/api/products",
        );
        const categoriesResponse = await fetch(
          "http://localhost:8000/api/categories",
        );

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

    fetchData();
  }, []);

  //... after useEffect ...

  // Group products by category
  const productsByCategory = categories
    .map((category) => ({
      ...category,
      products: products.filter((p) => p.category_id === category.id),
    }))
    .filter((category) => category.products.length > 0);

  // Filter based on search term
  const filteredCategories = productsByCategory
    .map((category) => ({
      ...category,
      products: category.products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter(
      (category) =>
        category.products.length > 0 ||
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  // Chunk categories with more than 10 products
  const allCards = [];
  filteredCategories.forEach((category) => {
    if (category.products.length > 10) {
      const numChunks = Math.ceil(category.products.length / 10);
      for (let i = 0; i < numChunks; i++) {
        allCards.push({
          id: `${category.id}-part-${i + 1}`,
          name: `${category.name} (بخش ${i + 1})`,
          products: category.products.slice(i * 10, (i + 1) * 10),
        });
      }
    } else {
      allCards.push(category);
    }
  });

  // Create columns for masonry layout
  const numColumns = 4;
  const columns = Array.from({ length: numColumns }, () => []);
  allCards.forEach((card, i) => {
    columns[i % numColumns].push(card);
  });

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
    <div className=" p-8 rounded-xl max-w-full mx-auto" dir="rtl">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-3 space-x-reverse mb-4 md:mb-0">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
            <PackageSearch size={24} />
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

        <button className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-lg shadow transition-all">
          <Plus size={18} />
          <span>محصول جدید</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 w-full md:w-1/3">
        <input
          type="text"
          placeholder="جستجو در محصولات یا دسته‌بندی..."
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Masonry-style layout */}
      <div className="flex flex-wrap -mx-3">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="w-full md:w-1/2 lg:w-1/4 px-3">
            {column.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6"
              >
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-bold text-lg text-gray-800">
                    {category.name}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-semibold text-gray-700" dir="ltr">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500" dir="ltr">
                          {product.weight || "-"}
                        </p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-md transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {category.products.length === 0 && (
                    <p className="p-4 text-center text-gray-500">
                      هیچ محصولی در این دسته یافت نشد.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        {allCards.length === 0 && (
          <div className="w-full text-center p-10 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-700">موردی یافت نشد</h3>
            <p className="text-gray-500 mt-2">
              با جستجوی شما هیچ محصول یا دسته‌بندی‌ای مطابقت ندارد.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
