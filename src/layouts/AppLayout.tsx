/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router";
import useStore from "../context/useStore";

export default function AppLayout() {
  const [user, setUser] = useStore<string>('user');

  const userJson = JSON.parse(user);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="bg-primary  w-11/12 flex items-center justify-between px-10 py-5 rounded-large mt-5">
        <div>
          <span className="font-mono text-lime-600 text-lg">Welcome</span>, <span className="font-bold text-sm">{userJson.first_name} {userJson.last_name}</span>
        </div>
        <div className="flex gap-5">
          <button className="bg-white text-black p-3 rounded-full" onClick={logOut}>Preferences</button>

          <button className="bg-black text-white p-3 rounded-full" onClick={logOut}>Logout</button>


        </div>
      </div>
      <Outlet />
    </div>
  );
}