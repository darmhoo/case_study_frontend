import { Atom } from "lucide-react";
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "../../services/api";
import useStore from "../../context/useStore";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [authenticated, setAuthenticated] = useStore<string>('auth');
  const [user, setUser] = useStore<string>('user');
  const [token, setToken] = useStore<string>('token');
  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        setLoginError(null);
        apiClient.post('/api/login', { email, password }, {
          headers: {            
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          setAuthenticated('authenticated');
          setToken(response.data.token);
          setUser(JSON.stringify(response.data.user));
          navigate('/');
        }).catch((error) => {
          setLoginError(error.response.data || 'Login failed')
        })
      
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Login failed!');
    }


  }




  return (
    <div className="bg-white flex flex-col rounded-lg items-center py-10 gap-20 min-h-[90vh]">
      <div className="">
        <Atom size={100} />
      </div>
      <div className="text-center">
        <h1 className="text-4xl">Welcome Back!</h1>
        <div className="font-extralight">Please enter your details</div>

      </div>
      <div>
        <form className="flex flex-col gap-5">
          {loginError ? (
            <div className="text-red-500 text-center">{'Login Failed'}</div>
          ) : <div></div>}
          <div className="relative mb-5">
            <input type="email" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">Email</label>
          </div>

          <div className="relative mb-5">
            <input type="password" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">Password</label>

          </div>

          <button className="bg-black text-white w-full py-4 rounded-full" onClick={handleLogin}>Log In</button>
        </form>

        <div className="my-10 text-center text-sm">
          Don't have an account? <Link to={'/auth/register'} className="text-blue-700">Register</Link>
        </div>
      </div>
    </div>
  );
}