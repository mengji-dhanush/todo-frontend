import TodoItem from "./TodoItem";
import { useContext } from "react";
import { todoContext } from "../pages/Todo";

const TodoList = () => {
  let { todos } = useContext(todoContext);
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
