"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const validate = (): boolean => {
    let tempErrors: Errors = {};
    if (!form.firstName) tempErrors.firstName = "First name is required";
    if (!form.lastName) tempErrors.lastName = "Last name is required";
    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Invalid email";
    }
    if (!form.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, form);
      toast.success("Registration successful");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response?.data || "Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold text-gray-900">Create your account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["firstName", "lastName", "email", "password"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-900" htmlFor={field}>
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={form[field as keyof FormState]}
                onChange={handleChange}
                className={`w-full p-2.5 border rounded-lg ${
                  errors[field as keyof Errors] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={field}
              />
              {errors[field as keyof Errors] && (
                <p className="text-red-500 text-xs mt-1">*{errors[field as keyof Errors]}</p>
              )}
            </div>
          ))}
          <button
            disabled={loading}
            type="submit"
            className="w-full flex items-center justify-center gap-4 text-white bg-[#e11d48] rounded-lg px-5 py-2.5"
          >
            {loading && (
              <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
            )}
            <p>Sign up</p>
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#e11d48] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
