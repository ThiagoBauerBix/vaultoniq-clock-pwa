import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/vaultoniq_logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event: { preventDefault: () => void }) {
    event.preventDefault();
    console.log(username, password);
    navigate("/");
  }
  return (
    <section className="h-full w-full text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className=" p-12 rounded rounded-lg drop-shadow-2xl shadow-2xl space-y-4 flex flex-col items-center justify-center">
          <a href="#" className="flex items-center mb-6">
            <img src={Logo} alt="logo" className="w-64" />
          </a>
          <h1 className="text-xl font-bold leading-tight tracking-tight py-1">
            Sign in to your account
          </h1>
          <form
            onSubmit={handleLogin}
            className="space-y-4 w-[100%] lg:w-[600px]"
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Your name
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name example"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="flex align-center justify-center">
              <button
                type="submit"
                className="w-[225px] bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </div>
            <p className="text-sm font-light text-gray-300">
              Don’t have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
