"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { RiLoaderFill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import eyeLogo from "@/assets/images/eye_logo.png";

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError(null);
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords must match");
    } else {
      setConfirmPasswordError(null);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordError || confirmPasswordError) return;

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password?token=${token}`, {
        password
      });
      toast.success(response.data);
      router.push("/auth/login");
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <Image className="mr-2 h-8 w-18" src={eyeLogo} alt="logo" />
          SI HER
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight leading-tight text-gray-900 md:text-2xl">
              Change Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {passwordError && <p className="mt-1 text-xs text-red-500">*{passwordError}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {confirmPasswordError && <p className="mt-1 text-xs text-red-500">*{confirmPasswordError}</p>}
              </div>
              <button
                disabled={loading}
                type="submit"
                style={{
                  background: "linear-gradient(#c8bafd, #3e21f3)"
                }}
                className="flex gap-4 justify-center items-center px-5 py-2.5 w-full text-sm font-medium text-center text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
              >
                {loading && <RiLoaderFill className="text-lg animate-spin" />}
                <p>Reset Password</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
