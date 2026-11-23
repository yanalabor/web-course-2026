
export function filterTodos(todos, filter) {
    return todos.filter((todo) => {
        if (filter === "active") {
            return !todo.completed;
        }

        if (filter === "completed") {
            return todo.completed;
        }

        return true;
    });
}

export function sortTodos(todos, sort) {
    const sorted = [...todos];

    switch (sort) {
        case "alphabet-asc":
            return sorted.sort((a, b) =>
                a.text.localeCompare(b.text, "ru")
            );

        case "alphabet-desc":
            return sorted.sort((a, b) =>
                b.text.localeCompare(a.text, "ru")
            );

        case "newest":
            return sorted.sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            );

        case "oldest":
            return sorted.sort(
                (a, b) =>
                    new Date(a.createdAt) - new Date(b.createdAt)
            );

        default:
            return sorted;
    }
}

export function getVisibleTodos(todos, filter, sort) {
    const filtered = filterTodos(todos, filter);

    return sortTodos(filtered, sort);
}
