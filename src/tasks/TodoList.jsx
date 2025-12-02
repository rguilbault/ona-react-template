import Todo from "./Todo";

function TodoList({ tasks, onClickStatusChange }) {
  return (
    <div className="todoList">
      <h2>Liste des tâches ({tasks.length})</h2>
      {(!tasks || tasks.length === 0) && <div>Aucune tâche.</div>}
      <div className="todo-list">
        {tasks.map((task) => (
          <Todo
            key={task.id}
            task={task}
            onClickStatusChange={() => onClickStatusChange(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
