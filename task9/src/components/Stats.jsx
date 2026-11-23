
function Stats({ stats }) {
    return (
        <div className="stats">
            <div className="stat-card">
                <span>Всего задач</span>
                <strong>{stats.total}</strong>
            </div>

            <div className="stat-card">
                <span>Выполнено</span>
                <strong>{stats.completed}</strong>
            </div>

            <div className="stat-card">
                <span>Осталось</span>
                <strong>{stats.active}</strong>
            </div>
        </div>
    );
}

export default Stats;
