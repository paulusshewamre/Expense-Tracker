import { CURRENCY } from '../constants';

export default function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item">
      <div className="expense-item__details">
        <span className="expense-item__title">{expense.title}</span>
        <span className="expense-item__meta">
          {expense.category} · {expense.date}
        </span>
      </div>
      <div className="expense-item__actions">
        <span className="expense-item__amount">{expense.amount} {CURRENCY}</span>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
