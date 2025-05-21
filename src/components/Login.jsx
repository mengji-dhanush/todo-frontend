import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ username: "", password: "" });
  console.log(typeof setIsLoggedIn);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = () => {
    navigate("https://todo-backend-p0if.onrender.com/signup");
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://todo-backend-p0if.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setIsLoggedIn(true);
        navigate("https://todo-backend-p0if.onrender.com/");
      } else {
        const err = await response.json();
        alert(err.error || "Login failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-linear-65 from-purple-500 to-pink-500">
      <div>
        <div className="w-full text-center text-5xl font-bold">Login</div>
        <div className="border-3 border-black rounded h-44 w-60 mt-4">
          <form onSubmit={login} className="flex flex-wrap">
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
              type="submit"
              className="rounded bg-black text-white text-xl font-semibold m-auto mt-2 cursor-pointer"
            >
              Login
            </button>
            <div>
              Don't have an account?{" "}
              <button
                onClick={signup}
                className="rounded bg-black text-white text-xl font-semibold m-1 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
