import { CURRENCY } from '../constants';
import { calculateTotalSpending } from '../services/expenseService';

export default function Dashboard({ expenses }) {
  const total = calculateTotalSpending(expenses);

  return (
    <section className="dashboard card">
      <h2>Dashboard</h2>
      <p className="dashboard__total">
        Total Spending: <strong>{total} {CURRENCY}</strong>
      </p>
    </section>
  );
}
