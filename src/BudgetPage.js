import React from "react";

function BudgetPage({
  monthlyBudget,
  setMonthlyBudget,
  expenses,
  budgetItems,
  setBudgetItems,
}) {
  const [expense, setExpense] = React.useState({
    title: "",
    category: "Survival",
    targetAmount: "",
    amount: "",
    description: "",
    remaining: "",
    principleAmount: "",
    interestRate: "",
    durationMonths: "",
  });

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = monthlyBudget - totalSpent;

  const handleMonthlyBudgetChange = (e) => {
    const value = e.target.value;
    setMonthlyBudget(value ? parseFloat(value) : 0);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveBudgetItem = (e) => {
    e.preventDefault();

    if (!expense.title || !expense.category) {
      alert("Please enter a title and select a category.");
      return;
    }

    const targetAmountNum = parseFloat(expense.targetAmount || "0");
    const amountNum = parseFloat(expense.amount || "0");
    const principleNum = parseFloat(expense.principleAmount || "0");
    const interestNum = parseFloat(expense.interestRate || "0");
    const durationNum = parseInt(expense.durationMonths || "0", 10);

    const remaining = targetAmountNum - amountNum;

    const newItem = {
      id: Date.now(),
      title: expense.title,
      category: expense.category,
      amount: amountNum,
      targetAmount: targetAmountNum,
      remaining,
      principleAmount: principleNum,
      interestRate: interestNum,
      durationMonths: durationNum,
      description: expense.description,
      createdAt: new Date().toISOString(),
    };

    setBudgetItems((prev) => [...prev, newItem]);

    setExpense({
      title: "",
      category: "Survival",
      targetAmount: "",
      amount: "",
      description: "",
      remaining: "",
      principleAmount: "",
      interestRate: "",
      durationMonths: "",
    });
  };

  const isLiability = expense.category === "Liabilities";

  return (
    <div className="card">
      <h1>Monthly Budget</h1>

      {/* Overall monthly budget */}
      <div className="form-row">
        <label>Overall Monthly Budget (₹)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={monthlyBudget}
          onChange={handleMonthlyBudgetChange}
        />
      </div>

      <div className="summary">
        <div>
          <div className="summary-label">Total Spent</div>
          <div className="summary-value">₹{totalSpent.toFixed(2)}</div>
        </div>
        <div>
          <div className="summary-label">Remaining Budget</div>
          <div
            className={
              "summary-value" + (remainingBudget < 0 ? " negative" : "")
            }
          >
            ₹{remainingBudget.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Budget item form */}
      <h2 style={{ marginTop: "1.2rem" }}>Plan a Budget Item</h2>

      <form onSubmit={handleSaveBudgetItem}>
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Home EMI, Wedding, Vacation"
            value={expense.title}
            onChange={handleFieldChange}
          />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select
            name="category"
            value={expense.category}
            onChange={handleFieldChange}
          >
            <option value="Survival">Survival</option>
            <option value="Liabilities">Liabilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Skill">Skill</option>
          </select>
        </div>

        <div className="form-row">
          <label>Target Amount (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="targetAmount"
            value={expense.targetAmount}
            onChange={handleFieldChange}
          />
        </div>

        <div className="form-row">
          <label>Amount Allocated This Month (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="amount"
            value={expense.amount}
            onChange={handleFieldChange}
          />
        </div>

        {isLiability && (
          <>
            <div className="form-row">
              <label>Principal Amount (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                name="principleAmount"
                value={expense.principleAmount}
                onChange={handleFieldChange}
              />
            </div>

            <div className="form-row">
              <label>Interest Rate (% per annum)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                name="interestRate"
                value={expense.interestRate}
                onChange={handleFieldChange}
              />
            </div>

            <div className="form-row">
              <label>Duration (months)</label>
              <input
                type="number"
                min="0"
                step="1"
                name="durationMonths"
                value={expense.durationMonths}
                onChange={handleFieldChange}
              />
            </div>
          </>
        )}

        <div className="form-row">
          <label>Description / Notes</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Optional notes about this goal/EMI..."
            value={expense.description}
            onChange={handleFieldChange}
          />
        </div>

        <button type="submit">Save Budget Item</button>
      </form>

      {budgetItems.length > 0 && (
        <div style={{ marginTop: "1.3rem" }}>
          <h3>Saved Budget Items</h3>
          <ul className="expense-list">
            {budgetItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} ({item.category})
                </span>
                <span>₹{item.amount.toFixed(2)}</span>
                <span>
                  Target ₹{item.targetAmount.toFixed(2)}
                  {item.remaining != null &&
                    ` • Left ₹${item.remaining.toFixed(2)}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BudgetPage;
