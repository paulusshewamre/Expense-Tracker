import { useState } from 'react';
import { CATEGORIES } from '../constants';
import { validateExpenseInput } from '../utils/validation';

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(getTodayDate);
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const validation = validateExpenseInput({ title, amount, category, date });

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    onAddExpense(validation.data);
    setTitle('');
    setAmount('');
    setCategory('');
    setDate(getTodayDate());
    setError('');
  }

  return (
    <section className="expense-form card">
      <h2>Add Expense</h2>

      {error && <p className="form-error" role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Burger"
            maxLength={100}
          />
        </div>

        <div className="form-field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="e.g. 350"
          />
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </section>
  );
}
