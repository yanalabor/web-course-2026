
function Filters({
    filter,
    setFilter,
    sort,
    setSort
}) {
    const filters = [
        { value: "all", label: "Все" },
        { value: "active", label: "Невыполненные" },
        { value: "completed", label: "Выполненные" }
    ];

    return (
        <div className="filter-section">
            <div className="filters">
                {filters.map((item) => (
                    <button
                        key={item.value}
                        className={
                            filter === item.value ? "active-filter" : ""
                        }
                        onClick={() => setFilter(item.value)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="sort-section">
                <label htmlFor="sort">Сортировка:</label>

                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="none">Без сортировки</option>
                    <option value="alphabet-asc">А → Я</option>
                    <option value="alphabet-desc">Я → А</option>
                    <option value="newest">Сначала новые</option>
                    <option value="oldest">Сначала старые</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;
