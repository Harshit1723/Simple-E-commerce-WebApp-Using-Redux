import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[rememberMe,setRememberMe]=useState(false);

  useEffect( ()=> {
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
    const storedUsername = localStorage.getItem('username') || '';
    const storedPassword = localStorage.getItem('password') || '';

    if (storedRememberMe) {
      setRememberMe(true);
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  },[]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const apiUrl = 'https://dummyjson.com/auth/login';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const userToken = data.token;

      //Save The Token in localstorage
      localStorage.setItem('token',userToken);

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      onLogin(userToken);
      
      // Use navigate to redirect to the home page after successful login
      navigate('/home');
     
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 w-screen  flex flex-col items-center justify-center ">
     
    <div className='max-h-screen min-h-96 min-w-96 bg-black shadow-md  rounded-md flex flex-col items-center '>
    <h1 className="text-3xl font-bold mt-8 ">Login Page</h1>

    <div >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >

        <div className=' mt-7 flex flex-col'>
        <label>
          Username
          <br/>
          <input className='mt-2 border-b  outline-none border-white bg-black' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password
          <br/>
          <input
          className='mt-2 border-b  outline-none border-white bg-black'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        </div>

        <div className='flex   items-center justify-center'>
        <button className=" px-8 rounded-md border border-blue-500 p-2 text-base font-semibold bg-black hover:border-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent transition duration-250" type="submit">Login</button>
        </div>

        <br/>


        <label className="flex items-center space-x-2">
  <span className="text-white">Remember Me</span>
  <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out bg-gray-600 rounded-full cursor-pointer">
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      className="hidden"
    />
    <div className={`absolute left-0 w-5 h-5 transition-transform duration-200 ease-in-out transform ${rememberMe ? 'translate-x-full bg-blue-500' : 'bg-white' } rounded-full`}></div>
  </div>
</label>


        
      </form>
    </div>
 
    </div>
    </div>
  );
}

export default LoginForm;
