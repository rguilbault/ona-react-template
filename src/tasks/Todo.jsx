function Todo({ task, onClickStatusChange }) {
  return (
    <div className="todo">
      <div className="todo-left">
        <h4>{task.title}</h4>
        <div>{task.description}</div>
      </div>
      <div className="todo-right">
        <div>{task.date}</div>
        <div>Etat : {task.status}</div>
        <div>
          <button
            className={`btn ${
              task.status === "DONE" ? "btn-secondary" : "btn-primary"
            }`}
            disabled={task.status === "DONE"}
            onClick={onClickStatusChange}
          >
            Changer état
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
