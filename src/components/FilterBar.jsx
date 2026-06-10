import { FILTER_OPTIONS } from '../constants';

export default function FilterBar({ selectedCategory, onCategoryChange }) {
  return (
    <section className="filter-bar card">
      <h2>Filter</h2>
      <div className="filter-bar__buttons">
        {FILTER_OPTIONS.map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-filter${selectedCategory === category ? ' btn-filter--active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
