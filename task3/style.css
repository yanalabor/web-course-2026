* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    background: radial-gradient(circle at top, #3a0000, #0a0a0a 70%);
    padding: 40px 20px;
}

.backdrop {
    background: linear-gradient(135deg, #b91c1c, #450a0a);
    padding: 6px;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(185, 28, 28, 0.35);
    width: 100%;
    max-width: 480px;
}

.app {
    background: #111111;
    border-radius: 20px;
    padding: 32px 28px;
    color: #f2f2f2;
}

.app-header {
    margin-bottom: 24px;
    border-bottom: 2px solid #b91c1c;
    padding-bottom: 12px;
}

.app-header h1 {
    font-size: 1.6em;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.todo-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.todo-form input {
    flex: 1;
    padding: 12px 14px;
    border: 2px solid #2a2a2a;
    border-radius: 10px;
    background: #1a1a1a;
    color: #f2f2f2;
    font-size: 1em;
    min-height: 44px;
    transition: border-color 0.2s;
}

.todo-form input::placeholder {
    color: #777;
}

.todo-form input:focus {
    outline: none;
    border-color: #b91c1c;
}

.todo-form input.input-error {
    border-color: #ff4d4d;
    animation: shake 0.3s;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-4px);
    }

    75% {
        transform: translateX(4px);
    }
}

.todo-form button {
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    background: #b91c1c;
    color: white;
    font-weight: bold;
    cursor: pointer;
    min-height: 44px;
    transition: background-color 0.2s, transform 0.2s;
}

.todo-form button:hover {
    background: #dc2626;
    transform: translateY(-1px);
}

.filters {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.filter-btn {
    flex: 1;
    padding: 10px;
    border: 2px solid #2a2a2a;
    border-radius: 8px;
    background: transparent;
    color: #ccc;
    cursor: pointer;
    font-size: 0.9em;
    min-height: 44px;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.filter-btn:hover {
    border-color: #b91c1c;
}

.filter-btn.active {
    background: #b91c1c;
    border-color: #b91c1c;
    color: white;
}

.todo-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    max-height: 360px;
    overflow-y: auto;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 12px 14px;
    transition: border-color 0.2s;
}

.todo-item:hover {
    border-color: #b91c1c;
}

.todo-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: #b91c1c;
    cursor: pointer;
    flex-shrink: 0;
}

.todo-text {
    flex: 1;
    word-break: break-word;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #777;
}

.delete-btn {
    background: transparent;
    border: none;
    color: #999;
    font-size: 1.1em;
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    transition: color 0.2s;
}

.delete-btn:hover {
    color: #ff4d4d;
}

.counter {
    text-align: center;
    color: #999;
    font-size: 0.9em;
    border-top: 1px solid #2a2a2a;
    padding-top: 16px;
}
