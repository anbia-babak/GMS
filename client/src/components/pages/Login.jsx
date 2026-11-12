import { useState } from "react";
import { useNavigate } from "react-router";
import { initialLoginForm, validateLogin, loginRequest } from "./loginLogic";
import ThemeToggle from "../Dashboard/ThemeToggle";

export default function Login({ onLogin }) {
  const [form, setForm] = useState(initialLoginForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const found = validateLogin(form);
  setErrors(found);
  setMessage("");

  if (Object.keys(found).length) return;

  setLoading(true);

  const result = await loginRequest(form);

  setLoading(false);

  if (result.ok) {
    setMessage("Signed in successfully.");

    if (onLogin) onLogin(result);

    navigate("/dashboard");
  } else {
    setMessage(result.message || "Invalid email or password.");
  }
};

  const fieldClass = (hasError) =>
    `h-11 w-full rounded-md border bg-[#0B2B26] px-3 text-sm text-[#DAF1DE] placeholder:text-[#8EB69B]/70 outline-none transition focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/25 dark:border-gray-300 dark:bg-white dark:text-gray-900 dark:placeholder:text-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-200${
      hasError ? "border-red-400" : "border-[#8EB69B]/30"
    }`;

  return (
    <div className="flex min-h-screen bg-[#051F20] font-sans text-[#DAF1DE] dark:bg-white dark:text-gray-900">
      <div className="hidden flex-1 flex-col justify-between bg-[#163832] dark:bg-gray-100 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#8EB69B] dark:bg-gray-200 text-lg font-extrabold text-[#051F20] dark:text-gray-900">G</span>
          <div>
            <p className="text-xl font-extrabold leading-tight">GMS</p>
            <p className="text-xs text-[#8EB69B] dark:text-gray-600">NewStar Management System</p>
          </div>
        </div>
        <div>
          <h2 className="max-w-md text-4xl font-extrabold leading-tight">Manage members, memberships and payments in one place.</h2>
          <p className="mt-4 max-w-md text-sm text-[#8EB69B] dark:text-gray-600">Sign in to continue to your gym dashboard.</p>
          <ThemeToggle />
        </div>
        <p className="text-xs text-[#8EB69B] dark:text-gray-600">© {new Date().getFullYear()} GMS. All rights reserved.</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-md rounded-xl border border-[#8EB69B]/25 dark:border-gray-200 bg-[#163832] dark:bg-white p-8 shadow-[0_24px_70px_rgb(5_31_32/48%)] dark:shadow-lg">
          <div className="mb-8 lg:hidden flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#8EB69B] dark:bg-gray-200 font-extrabold text-[#051F20] dark:text-gray-900">G</span>
            <p className="text-lg font-extrabold">GMS</p>
          </div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#8EB69B] dark:text-gray-600">Welcome back</p>
          <h1 className="mt-1 text-3xl font-extrabold dark:text-gray-900">Log in</h1>
          <p className="mt-2 text-sm text-[#8EB69B] dark:text-gray-600">Enter your email and password to continue.</p>

          <div className="mt-7 grid gap-5">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-xs font-bold text-[#8EB69B] dark:text-gray-600">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="admin@irongym.com" className={fieldClass(errors.email)} />
              {errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-xs font-bold text-[#8EB69B] dark:text-gray-600">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="••••••••" className={`${fieldClass(errors.password)} pr-16`} />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-bold text-[#8EB69B] dark:text-gray-600 hover:bg-[#235347] dark:hover:bg-gray-100">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-300">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#8EB69B] dark:text-gray-600">
                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} className="h-4 w-4 accent-[#8EB69B] dark:accent-gray-700" />
                Remember me
              </label>
              <button type="button" className="font-bold text-[#DAF1DE] dark:text-gray-900 hover:underline">Forgot password?</button>
            </div>
            <button type="submit" disabled={loading} className="h-11 w-full rounded-md bg-[#8EB69B] dark:bg-gray-200 text-sm font-extrabold text-[#051F20] dark:text-gray-900 transition hover:brightness-110 disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"}
            </button>
            {message && <p className="rounded-md bg-[#235347] dark:bg-gray-100 px-3 py-2 text-red-300 text-center text-xs font-bold">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
