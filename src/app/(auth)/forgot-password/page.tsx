"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { RiLoaderFill, RiCheckFill } from "react-icons/ri";

function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(email) ? null : "Invalid email");
    } else {
      setEmailError("Email is required");
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError) return;

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`, { email });
      setSuccess(true);
      toast.success("Reset password link sent successfully!");
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="p-10 text-center bg-white rounded-lg shadow-md">
          <img src="/eye_logo.png" alt="logo" className="mx-auto mb-2 h-10" />
          <h1 className="mb-4 text-3xl font-bold text-gray-900">SI HER</h1>
          <RiCheckFill className="mx-auto text-green-500 h-24 w-24" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Reset Password Link Sent!</h2>
          <p className="text-gray-600">Please check your email to reset your password.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img src="/eye_logo.png" alt="logo" className="mx-auto mb-2 h-10" />
          <h1 className="text-xl font-bold text-gray-900">Forget Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-gray-50 border rounded-lg w-full p-2.5 mt-1 ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:ring-primary-600 focus:border-primary-600`}
              placeholder="name@company.com"
            />
            {emailError && <p className="mt-1 text-xs text-red-500">*{emailError}</p>}
          </div>
          <div className="flex justify-between items-center text-sm">
            <Link href="/auth/login" className="text-blue-primary hover:underline">
              Sign in instead?
            </Link>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gradient-to-b from-light-purple to-blue-primary hover:opacity-90 disabled:opacity-80"
          >
            {loading ? (
              <>
                <RiLoaderFill className="text-lg animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgetPassword;
