import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpensesPage from "./ExpensesPage";
import BudgetPage from "./BudgetPage";
import ExportPage from "./ExportPage";

import { loadData, saveData } from "./storage";

function App() {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [budgetItems, setBudgetItems] = useState([]);

  useEffect(() => {
    const data = loadData();
    setMonthlyBudget(data.monthlyBudget);
    setExpenses(data.expenses);
    setBudgetItems(data.budgetItems);
  }, []);

  useEffect(() => {
    saveData({ monthlyBudget, expenses, budgetItems });
  }, [monthlyBudget, expenses, budgetItems]);

  // return (
  //   <Router>
  //     <div className="app">
  //       {/* nav omitted for brevity */}
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={
  //             <ExpensesPage expenses={expenses} setExpenses={setExpenses} />
  //           }
  //         />
  //         <Route
  //           path="/budget"
  //           element={
  //             <BudgetPage
  //               monthlyBudget={monthlyBudget}
  //               setMonthlyBudget={setMonthlyBudget}
  //               expenses={expenses}
  //               budgetItems={budgetItems}
  //               setBudgetItems={setBudgetItems}
  //             />
  //           }
  //         />
  //       </Routes>
  //     </div>
  //   </Router>
  // );
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <div className="nav-title">Fiancé Budget</div>
          <div className="nav-links">
            <Link to="/">Expenses</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/export">Export</Link>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <ExpensesPage expenses={expenses} setExpenses={setExpenses} />
            }
          />
          <Route
            path="/budget"
            element={
              <BudgetPage
                monthlyBudget={monthlyBudget}
                setMonthlyBudget={setMonthlyBudget}
                expenses={expenses}
                budgetItems={budgetItems}
                setBudgetItems={setBudgetItems}
              />
            }
          />
          <Route
            path="/export"
            element={
              <ExportPage
                monthlyBudget={monthlyBudget}
                expenses={expenses}
                budgetItems={budgetItems}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
