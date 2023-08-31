import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Micro-Blogging Platform</h1>
      <p className="text-lg text-gray-600 mb-6">Share your thoughts and connect with others!</p>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/login"
              className="text-blue-500 hover:underline transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/sign-up"
              className="text-blue-500 hover:underline transition duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
