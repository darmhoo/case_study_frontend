import { Outlet } from "react-router";
import Laying from '../assets/laying.png';

export default function AuthLayout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-primary w-full sm:w-5/6 min-h-[90vh] rounded-lg flex">
        <div className="w-3/5 p-10 mx-auto hidden sm:block">
          <img src={Laying} alt="" className="w-4/5 mt-40"/>
        </div>

        {/* will either be <Home/> or <Settings/> */}
        <div className="p-3 w-full sm:w-2/5">
          <Outlet />

        </div>
      </div>
    </div>
  );
}