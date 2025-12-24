import React from "react";

function ExportPage({ monthlyBudget, expenses, budgetItems }) {
  const handleDownload = () => {
    const payload = {
      monthlyBudget,
      expenses,
      budgetItems,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fiance-budget-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h1>Export Data</h1>
      <p className="empty">
        Download all your data (budget, expenses, budget items) as a JSON file
        for backup or further analysis.
      </p>

      <button type="button" onClick={handleDownload}>
        Download JSON
      </button>

      <div style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
        <div>Total expenses: {expenses.length}</div>
        <div>Total budget items: {budgetItems.length}</div>
      </div>
    </div>
  );
}

export default ExportPage;
