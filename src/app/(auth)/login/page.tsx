"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { RiLoaderFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eyeLogo from "@/assets/images/eye_logo.png";

interface LoginFormState {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

interface InputFieldProps {
  label: string;
  type: string;
  name: keyof LoginFormState;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, error, onChange }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className={`bg-gray-50 border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
      value={value}
      onChange={onChange}
    />
    {error && <p className="mt-1 text-xs text-red-500">*{error}</p>}
  </div>
);

function Login() {
  const [formData, setFormData] = useState<LoginFormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Custom validation function
  const validateForm = (): Errors => {
    let errors: Errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // ✅ Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // Directly navigate to the desired page
    router.push("/");
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image className="mb-2 w-auto h-10" src={eyeLogo} alt="" width={100} height={100} />
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Sign in to your account</h1>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Your email"
            type="email"
            name="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            error={errors.password}
            onChange={handleChange}
          />

          <div className="flex justify-between items-center text-sm">
            <label htmlFor="remember" className="flex gap-4 items-center">
              <input
                type="checkbox"
                id="remember"
                className="accent-blue-primary focus:ring-0 focus:ring-offset-0 focus:ring-none"
              />
              <span className="text-gray-500">Remember me</span>
            </label>

            <Link href="/forgot-password" className="text-blue-primary hover:underline">
              Forgot password?
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
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
