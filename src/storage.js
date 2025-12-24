const STORAGE_KEY = "fiance-budget-tracker";

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { monthlyBudget: 0, expenses: [], budgetItems: [] };
    }
    const data = JSON.parse(raw);
    return {
      monthlyBudget: data.monthlyBudget ?? 0,
      expenses: Array.isArray(data.expenses) ? data.expenses : [],
      budgetItems: Array.isArray(data.budgetItems) ? data.budgetItems : [],
    };
  } catch (e) {
    console.error("Failed to load data", e);
    return { monthlyBudget: 0, expenses: [], budgetItems: [] };
  }
}

export function saveData({ monthlyBudget, expenses, budgetItems }) {
  const payload = {
    monthlyBudget: monthlyBudget ?? 0,
    expenses: expenses ?? [],
    budgetItems: budgetItems ?? [],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
