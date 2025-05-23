const TodoForm = ({
  addTodo,
  text,
  setText,
  isEditing,
  editingId,
  editTodo,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form>
      <div className="m-1 w-full">
        <input
          placeholder="Add a task..."
          value={text}
          onChange={handleChange}
          className="w-[70%] m-1 border-1 rounded border-black"
        />
        {!isEditing ? (
          <button
            onClick={handleSubmit}
            className="rounded bg-green-700 text-white w-16 cursor-pointer"
          >
            Add
          </button>
        ) : (
          <button
            onClick={() => editTodo(editingId, text)}
            className="rounded bg-green-700 text-white w-16 cursor-pointer"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
