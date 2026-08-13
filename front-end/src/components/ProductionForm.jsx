import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, CheckCircle, AlertCircle } from "lucide-react";
import { apiUrl } from "../api";

export default function ProductionForm() {
  // LOGIC 1: Common data for the whole day
  const [globalData, setGlobalData] = useState({
    date: "",
    branch: "",
    description: "",
  });

  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

  // Set default date to today and fetch initial data
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setGlobalData((prev) => ({ ...prev, date: today }));

    const fetchData = async () => {
      try {
        const [branchesRes, categoriesRes, productsRes] = await Promise.all([
          fetch(apiUrl("/branches")),
          fetch(apiUrl("/product-categories")),
          fetch(apiUrl("/products")),
        ]);

        const branchesData = await branchesRes.json();
        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        const normalizedBranches = Array.isArray(branchesData)
          ? branchesData
          : branchesData.data || [];
        const normalizedCategories = Array.isArray(categoriesData.data)
          ? categoriesData.data
          : categoriesData;
        const normalizedProducts = Array.isArray(productsData.data)
          ? productsData.data
          : productsData;

        setBranches(normalizedBranches);
        setCategories(normalizedCategories);
        setProducts(normalizedProducts);

        if (normalizedBranches.length > 0) {
          setGlobalData((prev) => ({
            ...prev,
            branch: prev.branch || normalizedBranches[0].id,
          }));
        }
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

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const resetForm = () => {
    const today = new Date().toISOString().slice(0, 10);
    setGlobalData({
      date: today,
      branch: branches[0]?.id || "",
      description: "",
    });
    setProductionRows([
      { id: 1, category: "", product: null, weight: "", quantity: "" },
    ]);
  };

  // Handle adding a new empty row
  const addRow = () => {
    setProductionRows((prevRows) => {
      const newRow = {
        id: Date.now(), // Creates a unique random number for the ID
        category: "",
        product: null,
        weight: "",
        quantity: "",
      };
      return [...prevRows, newRow];
    });
  };

  // Handle removing a specific row
  const removeRow = (idToRemove) => {
    setProductionRows((prevRows) => {
      // Prevent deleting the very last row
      if (prevRows.length === 1) return prevRows;
      return prevRows.filter((row) => row.id !== idToRemove);
    });
  };

  // Handle typing inside a specific row
  const updateRow = (id, field, value) => {
    setProductionRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  // Handle saving everything to the database
  const handleSaveAll = async () => {
    if (!globalData.branch) {
      setToastType("error");
      setToastMessage("لطفاً یک نمایندگی انتخاب کنید.");
      return;
    }

    const validRows = productionRows.filter(
      (row) => row.product && row.quantity && Number(row.quantity) > 0,
    );

    if (validRows.length === 0) {
      setToastType("error");
      setToastMessage("لطفاً حداقل یک محصول با تعداد معتبر انتخاب کنید.");
      return;
    }

    const finalDataToSave = {
      date: globalData.date,
      branch_id: globalData.branch,
      description: globalData.description?.trim() || "",
      products: validRows.map((row) => ({
        product_id: row.product ? row.product.id : null,
        weight: row.weight,
        quantity: Number(row.quantity),
      })),
    };

    try {
      const response = await fetch(apiUrl("/productions"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(finalDataToSave),
      });

      const result = await response.json();

      if (response.ok) {
        setToastType("success");
        setToastMessage("تولیدات با موفقیت ذخیره شد!");
        resetForm();
        console.log("Data saved successfully:", result);
      } else {
        setToastType("error");
        setToastMessage("خطا در ذخیره سازی تولیدات!");
        console.error("Error saving data:", result);
      }
    } catch (error) {
      setToastType("error");
      setToastMessage("یک خطای شبکه رخ داد!");
      console.error("Network error:", error);
    }
  };

  console.log("Rendering with rows:", productionRows);

  const getProductWeights = (product) => {
    if (!product) return [];

    if (Array.isArray(product.weights)) return product.weights;
    if (Array.isArray(product.weightOptions)) return product.weightOptions;
    if (Array.isArray(product.weight_options)) return product.weight_options;
    if (product.weight) return [product.weight];

    return [];
  };

  return (
    <div className="min-h-screen font-sans" dir="rtl">
      {/* Main Content */}
      <div className=" mx-auto pb-12 px-4">
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
                {Array.isArray(branches) &&
                  branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              توضیحات تولید
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none min-h-[100px] bg-white text-gray-700"
              placeholder="مثلاً: تولید امروز شامل چهار نوع محصول با کیفیت بالا و تحویل سریع بود..."
              value={globalData.description}
              onChange={(e) =>
                setGlobalData({ ...globalData, description: e.target.value })
              }
            />
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
                    {Array.isArray(categories) &&
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <select
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#82352B] outline-none h-12 bg-gray-100 text-gray-700 direction-ltr text-left"
                    value={row.product ? row.product.id : ""}
                    onChange={(e) => {
                      const selectedProduct =
                        products.find(
                          (p) => String(p.id) === String(e.target.value),
                        ) || null;
                      updateRow(row.id, "product", selectedProduct);
                      updateRow(row.id, "weight", ""); // Reset weight on product change
                    }}
                    disabled={!row.category}
                  >
                    <option value="">انتخاب محصول...</option>
                    {Array.isArray(products) &&
                      products
                        .filter(
                          (p) => Number(p.category_id) === Number(row.category),
                        )
                        .map((p) => (
                          <option key={p.id} value={p.id}>
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
                    {getProductWeights(row.product).map((w) => (
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

      {toastMessage && (
        <div
          className={`fixed bottom-10 left-10 ${toastType === "success" ? "bg-green-600" : "bg-red-600"} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 space-x-reverse z-50 transform transition-all duration-500`}
        >
          {toastType === "success" ? (
            <CheckCircle size={24} />
          ) : (
            <AlertCircle size={24} />
          )}
          <span className="font-bold text-lg">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
