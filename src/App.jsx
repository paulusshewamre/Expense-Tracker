import { useEffect, useMemo, useState } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import {
  createExpense,
  deleteExpense,
  getExpenses,
} from './services/expenseService';
import './App.css';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'All') {
      return expenses;
    }

    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  function handleAddExpense(expenseData) {
    const newExpense = createExpense(expenseData);
    setExpenses((current) => [...current, newExpense]);
    setDeleteError('');
  }

  function handleDeleteExpense(id) {
    const result = deleteExpense(id);

    if (!result.success) {
      setDeleteError(result.message);
      return;
    }

    setExpenses((current) => current.filter((expense) => expense.id !== id));
    setDeleteError('');
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Expense Tracker</h1>
      </header>

      <main className="app-main">
        <Dashboard expenses={expenses} />
        <ExpenseForm onAddExpense={handleAddExpense} />
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {deleteError && (
          <p className="form-error global-error" role="alert">
            {deleteError}
          </p>
        )}

        <ExpenseList
          expenses={expenses}
          filteredExpenses={filteredExpenses}
          selectedCategory={selectedCategory}
          onDelete={handleDeleteExpense}
        />
      </main>
    </div>
  );
}
