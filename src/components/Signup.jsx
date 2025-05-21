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
    } catch (err) {
      alert(err);
    }
  };

  const login = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-linear-to-t from-sky-500 to-indigo-500">
      <div>
        <div className="w-full text-center text-5xl font-bold">Signup</div>
        <div className="border-3 border-black rounded h-44 w-60 mt-4">
          <form className="flex flex-wrap">
            <input
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={form.username}
              required
              className="w-full border-2 m-1 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border-2 m-1 rounded"
            />
            <button
              onClick={signup}
              className="rounded bg-black text-white text-xl font-semibold m-auto mt-2 cursor-pointer"
            >
              Signup
            </button>
            <div>
              already have an account?{" "}
              <button
                onClick={login}
                className="rounded bg-black text-white text-xl font-semibold m-1 cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
