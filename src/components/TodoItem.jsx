const TodoItem = ({ todo, toggleTodo, deleteTodo, handleEditButton }) => {
  return (
    <div className="m-4">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo._id)}
      />
      <span
        className="text-l font-semibold"
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.todo}
      </span>
      <button
        onClick={() => handleEditButton(todo._id)}
        className="rounded bg-black text-white w-12 ml-4 cursor-pointer font-semibold"
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-black rounded font-semibold text-l ml-4 cursor-pointer w-16"
        onClick={() => deleteTodo(todo._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
