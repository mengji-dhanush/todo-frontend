import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Signup() {
  let [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://todo-backend-p0if.onrender.com/signup",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      alert("Signup successful");
      navigate("/");
    } catch {
      alert("Some error occurred");
    }
  };

  const login = () => {
    navigate("/");
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={signup}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={form.username}
          required
          placeholder="username"
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
          placeholder="password"
        />
        <br />
        <br />
        <button type="submit">Signup</button>
      </form>
      <div>
        Have an account? <button onClick={login}>Login</button>
      </div>
    </>
  );
}
