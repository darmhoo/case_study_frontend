import { Atom } from "lucide-react";
import { Link, useNavigate } from "react-router";
import apiClient from "../../services/api";
import { useState } from "react";

export default function Register() {

  const [loginError, setLoginError] = useState(null);
  const [email, setEmail] = useState('darmhoo@hotmail.com');
  const [first_name, setFirstName] = useState('Omodamola');
  const [last_name, setLastName] = useState('Oladeji');
  const [password, setPassword] = useState('password');
  const [password_confirmation, setPasswordConfirmation] = useState('password');

  const navigate = useNavigate();


  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = {email, password, password_confirmation, first_name, last_name};

      apiClient.post('/api/register', data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        if(response.data.status === 'success'){
          navigate('/auth/login');
        }
      }).catch((error) => {
        setLoginError(error.response.data || 'registration failed')
      })
    }
    catch (error) {
      setLoginError(error.response?.data?.message || 'registration failed!');
    }


  }

  return (
    <div className="bg-white flex flex-col rounded-lg items-center py-10 gap-10 min-h-[90vh]">
      <div className="">
        <Atom size={100} />
      </div>
      <div className="text-center">
        <h1 className="text-4xl">Welcome</h1>
        <div className="font-extralight">Please enter your details</div>
      </div>
      <div>
        <form className="flex flex-col gap-5">
          <div className="relative mb-2">
            <input type="email" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">Email</label>
          </div>
          <div className="relative mb-2">
            <input type="text" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">First Name</label>
          </div>
          <div className="relative mb-2">
            <input type="text" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}/>
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">Last Name</label>
          </div>

          <div className="relative mb-2">
            <input type="password" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">Password</label>

          </div>

          <div className="relative mb-2">
            <input type="password" className="border border-b-3 border-t-0 border-r-0 border-l-0 outline-none w-full text-xl h-[55px]" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}/>
            <label className="absolute top-0 left-0 text-xl flex items-center h-[55px]">Repeat Password</label>

          </div>

          <button className="bg-black text-white w-full py-4 rounded-full" onClick={handleRegister}>Register</button>
        </form>

        <div className="my-10 text-center text-sm">
          Already have an account? <Link to={'/auth/login'} className="text-blue-700">Login</Link>
        </div>
      </div>
    </div>
  );
}