import { useEffect, useState, createContext } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/ToDoList";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const todoContext = createContext();

export default function App() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let [text, setText] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("https://todo-backend-p0if.onrender.com/todos", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          return res.json();
        } else {
          setIsLoggedIn(false);
          return null;
        }
      })
      .then((data) => {
        if (data?.alltasks) {
          setTodos(data.alltasks);
        }
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        setIsLoggedIn(false);
      });
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      fetch("https://todo-backend-p0if.onrender.com/todos", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.alltasks) {
            setTodos(data.alltasks);
          }
        })
        .catch((err) => console.error("Error loading todos:", err));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Login setIsLoggedIn={setIsLoggedIn} />;

  const addTodo = async (todo) => {
    try {
      const res = await fetch("https://todo-backend-p0if.onrender.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ todo }),
      });
      if (res.ok) {
        const refreshed = await fetch(
          "https://todo-backend-p0if.onrender.com/todos",
          {
            credentials: "include",
          }
        );
        const data = await refreshed.json();
        setTodos(data.alltasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      let res = await fetch(
        `https://todo-backend-p0if.onrender.com/todos/${id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      //refetching again after update

      // const res = await fetch("http://localhost:3000/todos", {
      //   credentials: "include",
      // });
      // const data = await res.json();
      // setTodos(data.alltasks);
      // let task = todos.find((todo) => todo._id === id);
      // task.completed = !task.completed;
      // setTodos(...todos);
      if (res.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  function handleEditButton(id) {
    setIsEditing(true);
    setEditingId(id);
    let task = todos.find((todo) => todo._id === id);
    setText(task.todo);
  }

  const editTodo = async (id, newText) => {
    try {
      const res = await fetch(
        `https://todo-backend-p0if.onrender.com/todos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text: newText }),
        }
      );

      if (res.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, todo: newText } : todo
          )
        );
        setIsEditing(false);
        setEditingId(null);
        setText("");
      } else {
        const error = await res.json();
        console.error("Edit failed:", error.message);
      }
    } catch (err) {
      console.error("Network error while editing task:", err);
    }
  };

  const logout = async () => {
    await fetch("https://todo-backend-p0if.onrender.com/logout", {
      credentials: "include",
    })
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://todo-backend-p0if.onrender.com/todos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <todoContext.Provider
      value={{
        addTodo,
        text,
        setText,
        isEditing,
        setIsEditing,
        editTodo,
        editingId,
        todos,
        toggleTodo,
        deleteTodo,
        handleEditButton,
        setIsLoggedIn,
      }}
    >
      {isLoggedIn ? (
        <div className="w-full h-screen flex flex-wrap justify-center items-center bg-linear-65 from-purple-500 to-pink-500">
          <div>
            <div className="w-full text-center text-3xl font-semibold">
              My Todo-list
            </div>
            <div className="border-3 border-black rounded">
              <div className="w-80 h-auto">
                <TodoForm />
                <TodoList />
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-black rounded font-semibold text-l my-4 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </todoContext.Provider>
  );
}
export { todoContext };
