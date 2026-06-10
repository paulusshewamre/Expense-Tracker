import { CATEGORIES } from '../constants';

export function validateExpenseInput({ title, amount, category, date }) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return { valid: false, message: 'Title is required' };
  }

  if (trimmedTitle.length > 100) {
    return { valid: false, message: 'Title must be 100 characters or less' };
  }

  const parsedAmount = Number(amount);

  if (amount === '' || Number.isNaN(parsedAmount)) {
    return { valid: false, message: 'Amount must be greater than zero' };
  }

  if (parsedAmount <= 0) {
    return { valid: false, message: 'Amount must be greater than zero' };
  }

  if (!category) {
    return { valid: false, message: 'Category is required' };
  }

  if (!CATEGORIES.includes(category)) {
    return { valid: false, message: 'Category is required' };
  }

  if (!date) {
    return { valid: false, message: 'Date is required' };
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return { valid: false, message: 'Date must be a valid date' };
  }

  return {
    valid: true,
    data: {
      title: trimmedTitle,
      amount: parsedAmount,
      category,
      date,
    },
  };
}

export function isValidExpense(expense) {
  if (!expense || typeof expense !== 'object') {
    return false;
  }

  const { id, title, amount, category, date } = expense;

  return (
    typeof id === 'number' &&
    typeof title === 'string' &&
    title.trim().length > 0 &&
    title.length <= 100 &&
    typeof amount === 'number' &&
    amount > 0 &&
    CATEGORIES.includes(category) &&
    typeof date === 'string' &&
    date.length > 0 &&
    !Number.isNaN(new Date(date).getTime())
  );
}
