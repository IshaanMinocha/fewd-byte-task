import React, { useState } from 'react';
import axios from '../api/axios';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(
          'http://panel.mait.ac.in:8001/auth/login/',
          {
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.data;
        if (response.status === 200) {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          window.location.href = '/dashboard';
        } else {
          alert(`Login failed: ${data.message}`);
        }
      } else {
        // Register
        const response = await axios.post(
          'http://panel.mait.ac.in:8001/auth/register/',
          {
            name,
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.data;
        if (response.status === 200) {
          alert('User registered successfully. Please login.');
          window.location.href = '/auth';
        } else if (response.status === 401){
          alert(`User Already Registered`);
        } else {
          alert(`Registration Done: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-600 h-[75vh]">
      <div className="bg-slate-400 p-8 rounded shadow-md w-96 h-[70vh]">
        <div className="flex justify-center gap-10 text-black">
          <button
            className={`text-3xl py-3 px-4 my-2 tracking-widest font-boldhead ${isLogin ? 'text-slate-700 border-2 border-black rounded-full' : ''}`}
            onClick={switchToLogin}
          >
            Login
          </button>
          <button
            className={`text-3xl py-3 px-4 my-2 tracking-widest font-boldhead ${!isLogin ? 'text-slate-700 border-2 border-black rounded-full  ' : ''}`}
            onClick={switchToRegister}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleLogin}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-xl mt-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-xl mt-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-xl mt-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-slate-600 text-white p-2 font-bold rounded">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
