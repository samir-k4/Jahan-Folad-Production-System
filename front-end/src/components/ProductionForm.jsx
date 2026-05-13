import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";

export default function ProductionForm() {
  // LOGIC 1: Common data for the whole day
  const [globalData, setGlobalData] = useState({
    date: "",
    branch: "",
  });

  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Set default date to today and fetch initial data
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setGlobalData((prev) => ({ ...prev, date: today }));

    const fetchData = async () => {
      try {
        const [branchesRes, categoriesRes, productsRes] = await Promise.all([
          fetch("/api/branches"),
          fetch("/api/categories"),
          fetch("/api/products"),
        ]);

        const branchesData = await branchesRes.json();
        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        setBranches(branchesData);
        setCategories(categoriesData.data);
        setProducts(productsData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error appropriately, e.g., show a notification to the user
      }
    };

    fetchData();
  }, []);

  // LOGIC 2: Dynamic array of products
  const [productionRows, setProductionRows] = useState([
    { id: 1, category: "", product: null, weight: "", quantity: "" },
  ]);

  // Handle adding a new empty row
  const addRow = () => {
    const newRow = {
      id: Date.now(), // Creates a unique random number for the ID
      category: "",
      product: null,
      weight: "",
      quantity: "",
    };
    setProductionRows([...productionRows, newRow]);
  };

  // Handle removing a specific row
  const removeRow = (idToRemove) => {
    // Prevent deleting the very last row
    if (productionRows.length === 1) return;
    setProductionRows(productionRows.filter((row) => row.id !== idToRemove));
  };

  // Handle typing inside a specific row
  const updateRow = (id, field, value) => {
    console.log(`Updating row ${id} with ${field}: ${value}`);
    setProductionRows(
      productionRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // Handle saving everything to the database
  const handleSaveAll = async () => {
    const finalDataToSave = {
      date: globalData.date,
      branch_id: globalData.branch,
      products: productionRows.map(row => ({
        product_id: row.product ? row.product.id : null,
        weight: row.weight,
        quantity: row.quantity,
      })),
    };

    try {
      const response = await fetch('/api/productions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(finalDataToSave)
      });

      const result = await response.json();

      if (response.ok) {
        alert("تولیدات با موفقیت ذخیره شد!");
        console.log("Data saved successfully:", result);
      } else {
        alert("خطا در ذخیره سازی تولیدات!");
        console.error("Error saving data:", result);
      }
    } catch (error) {
      alert("یک خطای شبکه رخ داد!");
      console.error("Network error:", error);
    }
  };

  console.log("Rendering with rows:", productionRows);

  return (
    <div className="min-h-screen font-sans" dir="rtl">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto my-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8 border-b pb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              ثبت تولیدات روزانه
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              لطفاً معلومات تولیدات جدید را با دقت انتخاب و وارد کنید.
            </p>
          </div>

          {/* Section 1: Global Information (Date & Branch) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center">
                تاریخ تولید
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700"
                value={globalData.date}
                onChange={(e) =>
                  setGlobalData({ ...globalData, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center">
                انتخاب نمایندگی
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700"
                value={globalData.branch}
                onChange={(e) =>
                  setGlobalData({ ...globalData, branch: e.target.value })
                }
              >
                <option value="">انتخاب نمایندگی...</option>
                {Array.isArray(branches) && branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Dynamic Production Rows */}
          <div className="space-y-4">
            {/* Headers for the rows (Desktop only) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 text-sm font-bold text-gray-600">
              <div className="col-span-3">کتگوری</div>
              <div className="col-span-3">انتخاب محصول</div>
              <div className="col-span-3">انتخاب وزن</div>
              <div className="col-span-2">تعداد تولید شده</div>
              <div className="col-span-1 text-center">حذف</div>
            </div>

            {/* The mapping logic */}
            {productionRows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-lg border md:border-none border-gray-200"
              >
                <div className="col-span-3">
                  <select
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700"
                    value={row.category}
                    onChange={(e) => {
                      console.log("Category changed:", e.target.value);
                      updateRow(row.id, "category", e.target.value);
                      updateRow(row.id, "product", null); // Reset product on category change
                      updateRow(row.id, "weight", ""); // Reset weight on category change
                    }}
                  >
                    <option value="">انتخاب کتگوری...</option>
                    {Array.isArray(categories) && categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <select
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700"
                    value={row.product ? row.product.name : ""}
                    onChange={(e) => {
                      const selectedProduct = products.find(p => p.name === e.target.value);
                      updateRow(row.id, "product", selectedProduct);
                      updateRow(row.id, "weight", ""); // Reset weight on product change
                    }}
                    disabled={!row.category}
                  >
                    <option value="">انتخاب محصول...</option>
                    {Array.isArray(products) && products
                      .filter(p => p.category_id === parseInt(row.category))
                      .map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <select
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700"
                    value={row.weight}
                    onChange={(e) =>
                      updateRow(row.id, "weight", e.target.value)
                    }
                    disabled={!row.product}
                  >
                    <option value="">انتخاب وزن...</option>
                    {row.product && row.product.weights.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <input
                    type="number"
                    placeholder="تعداد..."
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700"
                    value={row.quantity}
                    onChange={(e) =>
                      updateRow(row.id, "quantity", e.target.value)
                    }
                  />
                </div>

                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeRow(row.id)}
                    disabled={productionRows.length === 1}
                    className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="حذف این سطر"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          <div className="mt-6 flex justify-start">
            <button
              onClick={addRow}
              className="flex items-center space-x-2 space-x-reverse text-[#82352B] bg-[#82352B]/10 hover:bg-[#82352B]/20 font-bold py-2.5 px-5 rounded-lg transition-colors border border-[#82352B]/20"
            >
              <Plus size={18} />
              <span>اضافه کردن محصول دیگر</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 pt-6 border-t flex justify-end">
            <button
              onClick={handleSaveAll}
              className="flex items-center space-x-2 space-x-reverse bg-[#82352B] hover:bg-[#6c2c23] text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <Save size={20} />
              <span>ذخیره تمام تولیدات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
