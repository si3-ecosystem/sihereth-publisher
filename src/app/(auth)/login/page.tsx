"use client";
import { useState, useCallback, type FormEvent } from "react";
import { RiLoaderFill } from "react-icons/ri";
import Image from "next/image";
import InputField from "@/components/ui/Input";
import apiClient from "@/utils/interceptor";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setLoading(true);
      try {
        const response = await apiClient.post("/auth/login", { email, password });
        dispatch(login(response.data.user));
        router.push("/");
      } finally {
        setLoading(false);
      }
    },
    [email, password, dispatch, router]
  );

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4 text-sm">
      <div className="p-6 w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg space-y-6">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-3">
          <Image
            src="https://res.cloudinary.com/dq033xs8n/image/upload/v1744345811/si3_g3ow9r.svg"
            alt="Logo"
            width={100}
            height={90}
          />
          <h1 className="font-bold text-gray-900">Sign in to your account</h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-dm-sans tracking-wide">
          <InputField
            label="Your Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full px-5 py-2.5 font-medium text-white rounded-lg bg-gradient-to-b from-[#8969ff] to-[#592bff] hover:opacity-90 disabled:opacity-80"
          >
            {loading ? (
              <>
                <RiLoaderFill className="animate-spin size-5" />
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Forgot Password */}
          <div className="flex justify-end text-xs text-[#592bff] hover:underline">Forgot password?</div>
        </form>
      </div>
    </section>
  );
};

export default Login;
