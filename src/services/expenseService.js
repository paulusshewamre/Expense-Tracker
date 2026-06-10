import { STORAGE_KEY } from '../constants';
import { isValidExpense } from '../utils/validation';

function loadRawExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidExpense);
  } catch {
    return [];
  }
}

function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function getExpenses(category) {
  const expenses = loadRawExpenses();

  if (!category || category === 'All') {
    return expenses;
  }

  return expenses.filter((expense) => expense.category === category);
}

export function getExpenseById(id) {
  return loadRawExpenses().find((expense) => expense.id === id) ?? null;
}

export function createExpense({ title, amount, category, date }) {
  const expenses = loadRawExpenses();
  const newExpense = {
    id: Date.now(),
    title,
    amount,
    category,
    date,
  };

  const updatedExpenses = [...expenses, newExpense];
  saveExpenses(updatedExpenses);

  return newExpense;
}

export function deleteExpense(id) {
  const expenses = loadRawExpenses();
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return { success: false, message: 'Expense not found' };
  }

  const updatedExpenses = expenses.filter((item) => item.id !== id);
  saveExpenses(updatedExpenses);

  return { success: true, message: 'Expense deleted successfully' };
}

export function calculateTotalSpending(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
