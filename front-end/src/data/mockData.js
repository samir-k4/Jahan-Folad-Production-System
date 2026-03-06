// src/data/mockData.js

export const branches = [
  { id: 1, name: "نمایندگی کابل" },
  { id: 2, name: "نمایندگی هرات" }
];

export const categories = [
  { id: 1, name: "میخ" },
  { id: 2, name: "سیم" }
];

export const products = [
  { id: 1, category_id: 1, name: "میخ ۲ انچ کارتن", weight: "25kg", produced: 4500 },
  { id: 2, category_id: 1, name: "میخ ۳ انچ کارتن", weight: "25kg", produced: 3200 },
  { id: 3, category_id: 2, name: "سیم سیاه ۵۰ کیلو", weight: "50kg", produced: 1200 },
  { id: 4, category_id: 2, name: "سیم گالوانیزه", weight: "50kg", produced: 800 }
];

export const employees = [
  { id: 1, name: "احمد", position: "ولدر", branch_id: 1, presentDays: 24, totalDays: 27 },
  { id: 2, name: "محمود", position: "تخنیکر", branch_id: 1, presentDays: 27, totalDays: 27 },
  { id: 3, name: "کریم", position: "اپرایتور", branch_id: 2, presentDays: 20, totalDays: 27 }
];
