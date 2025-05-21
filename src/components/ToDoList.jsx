import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodo, deleteTodo, handleEditButton }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          handleEditButton={handleEditButton}
        />
      ))}
    </div>
  );
};

export default TodoList;
