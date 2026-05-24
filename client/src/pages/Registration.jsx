import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useRegistrationMutation     } from "../service/api";

const Registration = () => {
    const [registerUser,data ] = useRegistrationMutation();
    console.log(registerUser)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
const res = await registerUser(formData);
    if (formData.password !== formData.confirmPassword) {
       toast.warning("Password does not match");
      return;
    }

    console.log(formData);
    toast.success("Registration successful");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
