import React, { useState } from "react";

function ExpensesPage({ expenses, setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setTitle("");
    setAmount("");
    setDate("");
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="card">
      <h1>Expenses</h1>

      <form className="expense-form" onSubmit={handleAdd}>
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            placeholder="Dinner, Gift..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Amount (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>

      <h3>Total Spent: ₹{totalSpent.toFixed(2)}</h3>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((e) => (
            <li key={e.id}>
              <span>{e.title}</span>
              <span>₹{e.amount.toFixed(2)}</span>
              <span>{e.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpensesPage;
