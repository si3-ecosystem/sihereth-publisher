import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { RiLoaderFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

// ✅ Validation Schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// ✅ Reusable Input Component
const InputField = ({ label, type, name, formik }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className={`bg-gray-50 border ${
        formik.errors[name] && formik.touched[name] ? "border-red-500" : "border-gray-300"
      } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
      {...formik.getFieldProps(name)}
    />
    {formik.errors[name] && formik.touched[name] && (
      <p className="mt-1 text-xs text-red-500">*{formik.errors[name]}</p>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Memoized Formik Hook
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: useCallback(
      async (values) => {
        setLoading(true);
        try {
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth`, values);
          toast.success("Login successful");
          localStorage.setItem("SI_HER", JSON.stringify(response.data));
          navigate("/home");
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data || "Server error. Please try again later.");
        } finally {
          setLoading(false);
        }
      },
      [navigate]
    ),
  });

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img className="mb-2 w-auto h-10" src="/eye_logo.png" alt="" />
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Sign in to your account</h1>
        </div>

        <form className="mt-6 space-y-4" onSubmit={formik.handleSubmit}>
          <InputField label="Your email" type="email" name="email" formik={formik} />
          <InputField label="Password" type="password" name="password" formik={formik} />

          <div className="flex justify-between items-center text-sm">
            <label htmlFor="remember" className="flex gap-4 items-center">
              <input
                type="checkbox"
                id="remember"
                className="accent-[#3E21F3] focus:ring-0 focus:ring-offset-0 focus:ring-none"
              />
              <span className="text-gray-500">Remember me</span>
            </label>

            <Link to="/auth/forget-password" className="text-[#3E21F3] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-gradient-to-b from-[#c8bafd] to-[#3e21f3] hover:opacity-90 disabled:opacity-80"
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
