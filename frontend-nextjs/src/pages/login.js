import { useState } from "react";
import axios from 'axios';
import "../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleLogin = (event) => {
      event.preventDefault();
  
      axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem('token', response.data.key);
        router.push('/'); // redirect to dashboard after login
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error('There was an error logging in:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response was received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      });
    };

  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <div className="w-full max-w-lg">
        <form
          className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-16 mb-4"
          onSubmit={handleLogin}
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
          <div className="text-center text-3xl my-5 font-semibold">Login</div>
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
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>
          <a href="/register" className="text-blue-600 underline">
            New User?
          </a>
        </form>
      </div>
    </div>
  );
}
