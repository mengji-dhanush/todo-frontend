import TodoItem from "./TodoItem";
import { useContext } from "react";
import { todoContext } from "../pages/Todo";

const TodoList = () => {
  let { todos, toggleTodo, deleteTodo, handleEditButton } =
    useContext(todoContext);
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
