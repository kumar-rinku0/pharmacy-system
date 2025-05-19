import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../provider/auth-provider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    axios
      .post("/api/user/signin", { email: email, password: password })
      .then((res) => {
        console.log(res);
        const { username, _id, email, fullName } = res.data.user;
        toast.success(res.data.message);
        signIn({ username, _id, email, fullName });
        navigate(`/dashboard`);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message
        );
      });

    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-700">
          Pharmacy Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
