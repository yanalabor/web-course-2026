
function Stats({ todos }) {
    const total = todos.length;

    const completed = todos.filter(
        (todo) => todo.completed
    ).length;

    const active = total - completed;

    return (
        <div className="stats">
            <div className="stat-card">
                <span>Всего задач</span>
                <strong>{total}</strong>
            </div>

            <div className="stat-card">
                <span>Выполнено</span>
                <strong>{completed}</strong>
            </div>

            <div className="stat-card">
                <span>Осталось</span>
                <strong>{active}</strong>
            </div>
        </div>
    );
}

export default Stats;
