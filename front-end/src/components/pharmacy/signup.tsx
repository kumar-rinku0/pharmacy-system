import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../provider/auth-provider";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);

    axios
      .post("/api/user/signup", inputs)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.message || err.response.data.error || err.message
        );
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Pharmacy Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={inputs.fullName}
              onChange={handleChange}
              placeholder="Ajeet Kumar"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={inputs.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={inputs.phone}
              onChange={handleChange}
              placeholder="1234567890"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={inputs.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
