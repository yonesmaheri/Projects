import { useState } from "react";
import { findUserByEmail } from "../utils/userService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import CustomInput from "../components/customInput";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      toast.error("Invalid credentials");
      return;
    }

    toast.success(`Signed in successfully! Welcome ${user.name}`);
    login(user);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex lg:flex-row flex-col w-full items-start lg:items-center justify-center lg:justify-between">
      <div className="w-full lg:w-190 h-100 lg:h-screen p-2">
        <div className="h-full w-full p-16 custom-background rounded-xl flex flex-col items-center justify-between">
          <div className="flex w-full items-center gap-2">
            <h1 className="text-white text-2xl">Team Management</h1>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-6 items-start w-full">
              <p className="text-2xl lg:text-5xl font-bold text-white leading-15">
                Manage your team like <br /> never before.
              </p>
              <p className="text-sm lg:text-base text-[#F5F5F5]">
                Organize, manage, and connect to your team seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mx-auto flex flex-col items-start lg:items-center justify-center">
        <div className="max-w-[90%] mx-auto lg:min-w-130 flex flex-col gap-4 lg:mt-0 mt-5 lg:mb-0 mb-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <h2 className="text-4xl text-center font-bold">Login</h2>
            <CustomInput
              className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomInput
              className="rounded-2xl bg-[#1E1E1E] font-light border-subtle py-6 focus-visible:ring-[#1E1E1E] transition-all"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="text-black w-full py-3 rounded-2xl bg-white hover:bg-white/90 border border-subtle transition">
              Login
            </button>
          </form>
          <div className="text-center">
            <p className="text-[#A1A1A1] my-4">
              Don’t have an account?{" "}
              <Link  to={"/register"} className="text-white">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
