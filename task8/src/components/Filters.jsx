
function Filters({ filter, setFilter }) {
    const filters = [
        { value: "all", label: "Все" },
        { value: "active", label: "Невыполненные" },
        { value: "completed", label: "Выполненные" }
    ];

    return (
        <div className="filters">
            {filters.map((item) => (
                <button
                    key={item.value}
                    className={filter === item.value ? "active-filter" : ""}
                    onClick={() => setFilter(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default Filters;
