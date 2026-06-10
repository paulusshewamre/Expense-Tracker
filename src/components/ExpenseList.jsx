import ExpenseItem from './ExpenseItem';

export default function ExpenseList({
  expenses,
  filteredExpenses,
  selectedCategory,
  onDelete,
}) {
  let message = '';

  if (expenses.length === 0) {
    message = 'No expenses found.';
  } else if (filteredExpenses.length === 0) {
    message = 'No matching expenses found.';
  }

  return (
    <section className="expense-list card">
      <h2>Expense List</h2>

      {message ? (
        <p className="empty-message">{message}</p>
      ) : (
        <ul className="expense-list__items">
          {filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
