import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import summeryapi from "../common";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(summeryapi.login.url, {
        method: summeryapi.login.method,
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

     // console.log("data", data);

      if (!response.ok) {
        toast.error(data.message || "Login Failed");
        return;
      }

      // Optional role validation
      if (data.role && data.role !== formData.role) {
        toast.error("Please select the correct role");
        return;
      }

      localStorage.setItem("token", data.token);

      toast.success("Login Successful!");

      setTimeout(() => {
        if (data.role === "ADMIN") {
          navigate("/admin");
        } else if (data.role === "USER") {
          navigate("/employee");
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="username"
            placeholder="Enter Email"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Role Select */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;