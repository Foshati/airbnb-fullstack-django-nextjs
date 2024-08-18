import { useState } from "react";
import axios from 'axios';
import "../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isHost, setIsHost] = useState(false);
    const router = useRouter();

    const handleRegister = (event) => {
      event.preventDefault();
  
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
  
      axios.post('http://localhost:8000/api/registration', {
        username: username,
        email: email,
        password1: password,
        password2: confirmPassword,
      })
      .then(response => {
        localStorage.setItem('token', response.data.key);
        router.push('/login');
      })
      .catch(error => {
        if (error.response) {
          console.error('There was an error registering:', error.response.data);
        } else if (error.request) {
          console.error('No response was received:', error.request);
        } else {
          console.error('Error', error.message);
        }
      });
    };

  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="w-full max-w-lg">
        <form
          className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-16 mb-4"
          onSubmit={handleRegister}
        >
            <a href="/">
            <Image
                className="mx-auto w-auto"
                src={"/Airbnb-logo.png"}
                width={"100"}
                height={"100"}
                alt="logo"
            />
            </a>
          <div className="text-center text-3xl my-5 font-semibold">Register</div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mb-6 flex space-x-3 align-center">
            <label
              className="block text-gray-700 text-lg font-bold"
              htmlFor="isHost"
            >
              Host?
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="isHost"
              checked={isHost}
              onChange={(e) => setIsHost(e.target.checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Register
            </button>
          </div>
          <a href="/login" className="text-blue-600 underline">
            Already have an account?
          </a>
        </form>
      </div>
    </div>
  );
}
